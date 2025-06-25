import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ nft, index, deleteNFT, address, onPayAndView }) => {
    const isOwner = nft.owner === address;
    const isVideo = nft.data?.media?.includes('.mp4') || nft.data?.media?.includes('.webm') || nft.data?.media?.includes('.mov');
    const [showModal, setShowModal] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    const [canView, setCanView] = useState(false);

    const handleView = async () => {
        setShowModal(true);
        setCanView(false);
    };

    const handlePayAndView = async () => {
        setIsPaying(true);
        try {
            await onPayAndView(nft, index);
            setCanView(true);
        } catch (e) {
            alert('Payment failed or cancelled.');
        } finally {
            setIsPaying(false);
        }
    };

    return (
        <div className="card h-100 border-0 shadow-sm">
            <div className="position-relative">
                {isVideo ? (
                    <video 
                        className="card-img-top" 
                        style={{ height: '200px', objectFit: 'cover' }}
                        controls
                        preload="metadata"
                    >
                        <source src={nft.data?.media} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img 
                        src={nft.data?.media} 
                        className="card-img-top" 
                        alt={nft.data?.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={(e) => {
                            e.target.src = '/video-placeholder.png';
                        }}
                    />
                )}
                
                <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-primary">Premium</span>
                </div>
                
                {isOwner && (
                    <div className="position-absolute top-0 end-0 m-2">
                        <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteNFT(index)}
                            title="Remove Video"
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>
            
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-2">{nft.data?.title || 'Untitled Video'}</h5>
                <p className="card-text text-muted flex-grow-1">
                    {nft.data?.description || 'No description available'}
                </p>
                <div className="mb-2">
                    <span className="badge bg-warning text-dark me-2">Premium: {nft.data?.premium_amount || '-'} NEAR</span>
                    <span className="badge bg-secondary me-2">Normal: {nft.data?.normal_amount || '-'} NEAR</span>
                    <span className="badge bg-info text-dark">{nft.data?.premium_days || '-'} days</span>
                </div>
                
                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                            Creator: {nft.owner?.slice(0, 8)}...{nft.owner?.slice(-4)}
                        </small>
                        {isOwner && (
                            <span className="badge bg-success">Your Content</span>
                        )}
                    </div>
                    
                    <div className="mt-2">
                        {isOwner ? (
                            <button className="btn btn-outline-secondary btn-sm w-100" disabled>
                                Manage Access
                            </button>
                        ) : (
                            <button className="btn btn-primary btn-sm w-100" onClick={handleView}>
                                View (Pay-per-view)
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Modal for payment and viewing */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Premium Video Access</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body text-center">
                                {!canView ? (
                                    <>
                                        <p>To view this premium video, you must pay <b>{nft.data?.premium_amount || '-'} NEAR</b>.</p>
                                        <p>Premium access is valid for <b>{nft.data?.premium_days || '-'} days</b> from now.</p>
                                        <button className="btn btn-primary btn-lg" onClick={handlePayAndView} disabled={isPaying}>
                                            {isPaying ? 'Processing Payment...' : 'Pay & View'}
                                        </button>
                                    </>
                                ) : (
                                    <video 
                                        src={nft.data?.media} 
                                        controls 
                                        autoPlay
                                        style={{ width: '100%', maxHeight: '60vh', borderRadius: '8px' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
