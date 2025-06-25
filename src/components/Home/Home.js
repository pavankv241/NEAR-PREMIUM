import React, { useContext } from 'react';
import { NearContext } from '@/wallets/near';

const Home = ({ onRouteChange }) => {
  const { signedAccountId } = useContext(NearContext);

  return (
    <div className="hero-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            {/* Main heading with gradient text */}
            <h1 className="display-3 fw-bold mb-4">
              Welcome to the Future of
              <span className="gradient-text d-block"> NFT Creation</span>
            </h1>
            
            {/* Subtitle */}
            <p className="lead mb-5 text-light">
              Mint, explore, and manage your digital assets on the NEAR blockchain with our cutting-edge platform
            </p>
            
            {/* Feature cards */}
            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="card-modern text-center h-100">
                  <div className="mb-3">
                    <span className="fs-1 text-primary">Create</span>
                  </div>
                  <h5 className="fw-bold">Easy Minting</h5>
                  <p className="text-muted">Create unique NFTs with just a few clicks</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-modern text-center h-100">
                  <div className="mb-3">
                    <span className="fs-1 text-primary">Discover</span>
                  </div>
                  <h5 className="fw-bold">Explore Gallery</h5>
                  <p className="text-muted">Discover amazing NFTs from the community</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-modern text-center h-100">
                  <div className="mb-3">
                    <span className="fs-1 text-primary">Earn</span>
                  </div>
                  <h5 className="fw-bold">Burn & Earn</h5>
                  <p className="text-muted">Burn your NFTs and earn rewards</p>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              {signedAccountId ? (
                <>
                  <button 
                    onClick={() => onRouteChange("mint")}
                    className="btn btn-modern btn-lg pulse"
                  >
                    Start Minting
                  </button>
                  <button 
                    onClick={() => onRouteChange("explore")}
                    className="btn btn-modern btn-lg"
                    style={{ background: 'var(--secondary-gradient)' }}
                  >
                    Explore NFTs
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => onRouteChange("mint")}
                    className="btn btn-modern btn-lg pulse"
                  >
                    Get Started
                  </button>
                  <button 
                    onClick={() => onRouteChange("explore")}
                    className="btn btn-modern btn-lg"
                    style={{ background: 'var(--secondary-gradient)' }}
                  >
                    View Gallery
                  </button>
                </>
              )}
            </div>
            
            {/* Stats */}
            <div className="row mt-5 pt-5">
              <div className="col-md-4">
                <div className="text-center">
                  <h3 className="gradient-text fw-bold">1000+</h3>
                  <p className="text-muted">NFTs Minted</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <h3 className="gradient-text fw-bold">500+</h3>
                  <p className="text-muted">Active Users</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <h3 className="gradient-text fw-bold">50+</h3>
                  <p className="text-muted">NFTs Burned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements for visual appeal */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ pointerEvents: 'none', zIndex: -1 }}>
        <div className="position-absolute top-25 start-25 float" style={{ fontSize: '4rem', opacity: 0.05, color: '#667eea' }}>✦</div>
        <div className="position-absolute top-75 start-75 float" style={{ fontSize: '3rem', opacity: 0.05, color: '#764ba2', animationDelay: '2s' }}>✦</div>
        <div className="position-absolute top-50 start-10 float" style={{ fontSize: '2rem', opacity: 0.05, color: '#f093fb', animationDelay: '4s' }}>✦</div>
      </div>
    </div>
  );
}

export default Home;
