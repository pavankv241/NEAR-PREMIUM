import React from 'react';
import Card from '../Card/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardList = ({ userNFTs, deleteNFT, address }) => {
    return (
        <div className="row g-4">
            {userNFTs.map((nft, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                    <Card 
                        nft={nft} 
                        index={index} 
                        deleteNFT={deleteNFT} 
                        address={address}
                    />
                </div>
            ))}
        </div>
    );
};

export default CardList;
