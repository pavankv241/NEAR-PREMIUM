import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({ onRouteChange }) => {
    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                    <div className="mb-5">
                        <h1 className="display-3 fw-bold mb-4">
                            Welcome to <span className="text-primary">Ignitus Network</span>
                        </h1>
                        <p className="lead text-muted mb-4">
                            The premier platform for premium video content on the NEAR blockchain. 
                            Upload, monetize, and access exclusive video content with NFT-based access control.
                        </p>
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
