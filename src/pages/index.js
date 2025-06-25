import { useContext, useEffect, useState } from 'react';
import Home from '@/components/Home/Home';
import jws from "../contract/key.json";
import { PinataSDK } from 'pinata-web3';
import Mint from '@/components/Mint/Mint';
import { Navbar } from '@/components/Navbar/Navbar';
import { NearContext} from '@/wallets/near';
import { NftNearContract, PriceOracle } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from '@/components/Explore/Explore';
// import Log from '@/components/Log/Log'; // Burn Log functionality temporarily disabled

const CONTARCT = NftNearContract;
const PRICE_CONTRACT = PriceOracle;

const pinata = new PinataSDK({
    pinataJwt: jws.jws,
    pinataGateway: "beige-sophisticated-baboon-74.mypinata.cloud",
});

const IndexPage = () => {
    const { signedAccountId, wallet} = useContext(NearContext);
    const [route, setRoute] = useState("home");
    const [connected, setConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shouldFetchVideos, setShouldFetchVideos] = useState(false);
    const [videos, setVideos] = useState([]);
    const [isLogLoading, setIsLogLoading] = useState(false);
    const [log, setLog] = useState([]);

    useEffect(() => {
        if(signedAccountId) {
            setConnected(true)
        } else {
            setConnected(false)
        }
    }, [signedAccountId])

    useEffect(() => {
      async function getAllVideos() {
        if (connected && signedAccountId) { 
          try {
            setIsLoading(true);
            const count = await wallet.viewMethod({contractId: CONTARCT, method: "get_total_count"});    
            const videoList = [];
  
            for(let i =0; i<count; i++ ){
              const i_string = String(i);
              const tx = await wallet.viewMethod({contractId: CONTARCT, method: "get_nft", args: {index: i_string}});
              if(tx.data) {
                console.log(tx)
                videoList.push(tx);
              }
            }
            setVideos(videoList);
            setShouldFetchVideos(false);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching videos:', error);
            toast.error("Error fetching premium videos", {
              position: "top-center"
            })
          }
        }
      }
      getAllVideos();
    }, [shouldFetchVideos, connected, signedAccountId]);

    /* Burn Log functionality temporarily disabled
    useEffect(() => {
      async function getBurnLog() {
        if(connected && signedAccountId) {
          try {
            setIsLogLoading(true);

            const log = await wallet.viewMethod({contractId: CONTARCT, method: "get_burn_log"});
            
            function convertToIST(timestamp) {
              const timestampMilliSec = Math.floor(timestamp / 1_000_000);
              const date = new Date(timestampMilliSec);
              return date
            }

            const formatLog = log.map(entry => ({
              ...entry,
              timestamp: convertToIST(entry.timestamp),
            }));

            setLog(formatLog);
          } catch (e) {
            console.log("error", e);
            toast.error("Error getting burn log", {
              position: 'top-center'
            })
          } finally {
            setIsLogLoading(false);
          }
        }
      }

      getBurnLog();
    }, [connected, signedAccountId])
    */

  const onRouteChange = (route) => {
    setRoute(route);
  };


const showToastAndWait = async (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 5000,
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));
  return true;
};


  const uploadVideo = async (title, description, uri, premiumAmount, normalAmount, premiumDays) => {
    if(!signedAccountId) return;
    try {
      const tokenMetadata = {
        title: title,
        description: description,
        media: `https://beige-sophisticated-baboon-74.mypinata.cloud/ipfs/${uri}`,
        premium_amount: premiumAmount,
        normal_amount: normalAmount,
        premium_days: premiumDays
      };

      const metadataSizeInBytes = new TextEncoder().encode(JSON.stringify(tokenMetadata)).length;

      const coverageFee = Math.ceil(metadataSizeInBytes * 1e19);
      const SMARTCONTARCTSTORAGE = 0.0684 * 1e24;
      const totalCoverageFee = Math.ceil(coverageFee + SMARTCONTARCTSTORAGE);

      await showToastAndWait(`A fee of ${(metadataSizeInBytes / 100000) + 0.0684} will be deducted`);

      const depositAmount = BigInt(totalCoverageFee);

      const tx = await wallet.callMethod({
          contractId: CONTARCT,
          method: 'mint',
          args: {
              token_id: title,
              token_metadata: tokenMetadata
          },
          deposit: depositAmount.toString()
        });
        toast.success("Premium video uploaded successfully", {
            position: "top-center"
          });
        setShouldFetchVideos(true);
        onRouteChange("explore");
    } catch (e) {
        console.log(e)
        toast.error('Error uploading video', {
            position: "top-center"
          });
    }
  }

  const uploadToPinata = async (file) => {
    if (!file) {
      throw new Error("File is required");
    }

    try {
      toast.info("Uploading video to IPFS", {
        position:"top-center"
      })
      const uploadVideo = await pinata.upload.file(file);
      return uploadVideo.IpfsHash;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      toast.error("Uploading video failed.", {
        position: "top-center"
      });
      throw new Error("Upload to Pinata failed.");
    }
  };

  const removeVideo = async (id) => {
    if(!signedAccountId) return;
    try {
      const depositAmount = BigInt(1);
      const BurnFee = BigInt(1000000000000000000000);

      const priceResponse = await wallet.viewMethod({
        contractId: PRICE_CONTRACT,
        method: "get_price_data",
      });

      const prices = priceResponse.prices;
      const value = prices.filter(price => price.asset_id === "wrap.testnet");
      
      const price_of_1_Near = (value[0].price.multiplier / (10 ** value[0].price.decimals)) * (10 ** 24);
      const fee_price = 0.001 * price_of_1_Near;

      await showToastAndWait(`A fee of 0.001 (${fee_price} USD) will be deducted for removal fee`);
      
      await wallet.callMethod({
        contractId: CONTARCT,
        method: "pay_burn_fee",
        args: {
          index: id,
        },
        deposit: BurnFee.toString()
      })
      await wallet.callMethod({
          contractId: CONTARCT,
          method: 'burn',
          args: {
              index: id,
              usd: fee_price.toString(),
          },
          deposit: depositAmount.toString()
      });
      toast.success("Video removed successfully", {
          position: "top-center"
        });
      setShouldFetchVideos(true);
    } catch (e) {
        console.log(e)
        toast.error('Error removing video:', {
            position: "top-center"
          });
    }
  }

  // Payment logic for pay-per-view
  const onPayAndView = async (nft, index) => {
    if (!signedAccountId || !wallet) throw new Error('Wallet not connected');
    const premiumAmount = nft.data?.premium_amount;
    const creator = nft.owner;
    if (!premiumAmount || !creator) throw new Error('Invalid video data');
    // Convert NEAR to yoctoNEAR
    const yoctoAmount = BigInt(Math.floor(Number(premiumAmount) * 1e24)).toString();
    await wallet.callMethod({
      contractId: creator,
      method: '', // simple transfer
      args: {},
      deposit: yoctoAmount
    });
  };

  return (
    <>
        <ToastContainer />
        <Navbar onRouteChange={onRouteChange}/>
        {route === "home" ? (
                <Home onRouteChange={onRouteChange}/>
            ) : route === "explore" ? (
                <Explore nfts={videos} isConnected={connected} isLoading={isLoading} deleteNFT={removeVideo} address={signedAccountId} onPayAndView={onPayAndView}/>
            ) : route === "mint" ? (
                <Mint uploadToPinata={uploadToPinata} mintNFT={uploadVideo} />
            ) : /* route == "log" ? (
                <Log log={log} isLogLoading={isLogLoading} isConnected={connected}/>
            ) : */ (
                <>Cannot find page</>
            )
        }
    </>
  );
};

export default IndexPage;
