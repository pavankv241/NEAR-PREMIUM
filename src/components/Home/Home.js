import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({ onRouteChange }) => {
    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                    <div className="mb-5">
                        <h1 className="display-3 fw-bold mb-4">
                            Welcome to <span className="text-primary">NEAR Premium</span>
                        </h1>
                        <p className="lead text-muted mb-4">
                            The premier platform for premium video content on the NEAR blockchain. 
                            Upload, monetize, and access exclusive video content with NFT-based access control.
                        </p>
                    </div>

                    <div className="row g-4 mb-5">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3">
                                        <span className="fs-1 text-primary">🎬</span>
                                    </div>
                                    <h5 className="card-title fw-bold">Upload Premium Content</h5>
                                    <p className="card-text text-muted">
                                        Share your exclusive videos and monetize your content with NFT-based access tokens.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3">
                                        <span className="fs-1 text-primary">🔒</span>
                                    </div>
                                    <h5 className="card-title fw-bold">Secure Access Control</h5>
                                    <p className="card-text text-muted">
                                        Each video is protected by blockchain-based NFTs ensuring secure and verifiable access.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3">
                                        <span className="fs-1 text-primary">💰</span>
                                    </div>
                                    <h5 className="card-title fw-bold">Direct Monetization</h5>
                                    <p className="card-text text-muted">
                                        Earn directly from your content with transparent blockchain transactions and no intermediaries.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <button 
                            className="btn btn-primary btn-lg px-4"
                            onClick={() => onRouteChange("explore")}
                        >
                            Browse Premium Videos
                        </button>
                        <button 
                            className="btn btn-outline-primary btn-lg px-4"
                            onClick={() => onRouteChange("mint")}
                        >
                            Upload Your Video
                        </button>
                    </div>

                    <div className="mt-5">
                        <p className="text-muted small">
                            Powered by NEAR Blockchain • IPFS Storage • NFT Access Control
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
