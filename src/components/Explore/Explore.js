import React from "react";
import CardList from "../CardList/CardList";
import 'bootstrap/dist/css/bootstrap.min.css';

const Explore = ({ nfts, isConnected, isLoading, deleteNFT, address }) => {

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Premium Video Library</h2>
            <p className="text-muted">Discover exclusive video content from creators around the world</p>
          </div>
        </div>
      </div>
      
      {isConnected ? (
        isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading premium videos...</p>
          </div>
        ) : nfts.length > 0 ? (
          <CardList userNFTs={nfts} deleteNFT={deleteNFT} address={address}/>
        ) : (
          <div className="text-center py-5">
            <div className="mb-3">
              <span className="fs-1 text-muted">🎬</span>
            </div>
            <h4 className="text-muted">No Premium Videos Yet</h4>
            <p className="text-muted">Be the first to upload premium video content!</p>
          </div>
        )
      ) : (
        <div className="text-center py-5">
          <div className="mb-3">
            <span className="fs-1 text-muted">🔐</span>
          </div>
          <h4 className="text-muted">Connect Your Wallet</h4>
          <p className="text-muted">Please connect your NEAR wallet to browse premium videos</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
