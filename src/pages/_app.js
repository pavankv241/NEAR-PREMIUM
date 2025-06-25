import { useEffect, useState } from 'react';

import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Wallet, NearContext } from '@/wallets/near';
import { NetworkId } from '@/config';

const wallet = new Wallet({ networkId: NetworkId });

export default function MyApp({ Component, pageProps }) {
  const [signedAccountId, setSignedAccountId] = useState('');

  useEffect(() => { 
    wallet.startUp(setSignedAccountId).catch(error => {
      console.warn('Wallet startup error (non-critical):', error);
      // Continue with app functionality even if wallet fails to initialize
    });
  }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <div className="App">
        <Component {...pageProps} />
      </div>
    </NearContext.Provider>
  );
}
