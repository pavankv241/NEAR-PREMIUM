import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ nft, index, deleteNFT, address }) => {
    const isOwner = nft.owner === address;
    const isVideo = nft.data?.media?.includes('.mp4') || nft.data?.media?.includes('.webm') || nft.data?.media?.includes('.mov');

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
                            e.target.src = 'https://via.placeholder.com/400x200?text=Video+Content';
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
                        <button className="btn btn-primary btn-sm w-100">
                            {isOwner ? 'Manage Access' : 'Purchase Access'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
