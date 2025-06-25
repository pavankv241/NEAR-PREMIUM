import React from 'react';
import { useContext } from 'react';
import { NearContext } from '@/wallets/near';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Navbar = ({ onRouteChange }) => {
    const { signedAccountId, signIn, signOut } = useContext(NearContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand fw-bold" href="#" onClick={() => onRouteChange("home")}>
                    <span className="text-primary">NEAR</span> Premium
                </a>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => onRouteChange("home")}>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => onRouteChange("explore")}>
                                Premium Videos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => onRouteChange("mint")}>
                                Upload Video
                            </a>
                        </li>
                    </ul>
                    
                    <div className="d-flex">
                        {signedAccountId ? (
                            <div className="d-flex align-items-center">
                                <span className="text-light me-3">
                                    {signedAccountId}
                                </span>
                                <button 
                                    className="btn btn-outline-light btn-sm"
                                    onClick={signOut}
                                >
                                    Disconnect
                                </button>
                            </div>
                        ) : (
                            <button 
                                className="btn btn-primary"
                                onClick={signIn}
                            >
                                Connect Wallet
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
