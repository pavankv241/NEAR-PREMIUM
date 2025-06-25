import React, { useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { NearContext } from '@/wallets/near';
import 'bootstrap/dist/css/bootstrap.min.css';

const Mint = ({ uploadToPinata, mintNFT }) => {
    const { signedAccountId } = useContext(NearContext);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isMinting, setIsMinting] = useState(false);
    const [isDragover, setIsDragover] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
            'video/*': ['.mp4', '.webm', '.mov']
        },
        onDrop: (acceptedFiles) => {
            const previewFile = Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0]),
            });
            setFile(previewFile);
        },
        onDragEnter: () => setIsDragover(true),
        onDragLeave: () => setIsDragover(false),
        onDropAccepted: () => setIsDragover(false),
    });

    const clearImage = () => {
        if (file && file.preview) {
            URL.revokeObjectURL(file.preview);
        }
        setFile(null);
    };

    const handleMint = async () => {
        if (!signedAccountId) {
            alert('Please connect your wallet first!');
            return;
        }

        if (!file || !title || !description) {
            alert('Please complete all fields');
            return;
        }

        setIsMinting(true);

        try {
            const IpfsHash = await uploadToPinata(file);
            await mintNFT(title, description, IpfsHash);
            clearImage();
            setTitle('');
            setDescription('');
        } catch (e) {
            console.log(e);
        } finally {
            setIsMinting(false);
        }
    };

    if (!signedAccountId) {
        return (
            <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
                <div className="card-modern text-center" style={{ maxWidth: '500px' }}>
                    <div className="mb-4">
                        <span className="fs-1 text-primary">Lock</span>
                    </div>
                    <h3 className="gradient-text fw-bold mb-3">Wallet Required</h3>
                    <p className="text-muted mb-4">
                        Please connect your NEAR wallet to start minting NFTs
                    </p>
                    <button className="btn btn-modern">
                        Connect Wallet
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {/* Header */}
                    <div className="text-center mb-5">
                        <h2 className="gradient-text fw-bold mb-3">Create Your NFT</h2>
                        <p className="text-muted">Upload your digital asset and mint it as a unique NFT on NEAR blockchain</p>
                    </div>

                    <div className="card-modern">
                        {/* File Upload Section */}
                        <div className="mb-4">
                            <h5 className="fw-bold mb-3">Upload Your Asset</h5>
                            <div 
                                {...getRootProps({ 
                                    className: `dropzone-modern ${isDragover ? 'dragover' : ''}` 
                                })}
                            >
                                <input {...getInputProps()} />
                                {file ? (
                                    <div className="text-center">
                                        {file.type.startsWith('image/') ? (
                                            <img 
                                                src={file.preview} 
                                                alt="Preview" 
                                                className="img-fluid rounded mb-3" 
                                                style={{ maxHeight: '300px', maxWidth: '100%' }} 
                                            />
                                        ) : (
                                            <video 
                                                src={file.preview} 
                                                controls 
                                                className="img-fluid rounded mb-3" 
                                                style={{ maxHeight: '300px', maxWidth: '100%' }}
                                            />
                                        )}
                                        <div className="d-flex justify-content-center gap-2">
                                            <button 
                                                className="btn btn-modern btn-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    clearImage();
                                                }}
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="mb-3">
                                            <span className="fs-1 text-primary">Upload</span>
                                        </div>
                                        <h6 className="fw-bold">Drag & Drop your file here</h6>
                                        <p className="text-muted mb-3">or click to browse</p>
                                        <p className="text-muted small">
                                            Supports: JPG, PNG, GIF, WebP, MP4, WebM, MOV
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">NFT Title</label>
                                <input
                                    type="text"
                                    className="input-modern w-100"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter a unique title for your NFT"
                                    maxLength={50}
                                />
                                <small className="text-muted">Max 50 characters</small>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Description</label>
                                <textarea
                                    className="input-modern w-100"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe your NFT"
                                    rows="3"
                                    maxLength={500}
                                />
                                <small className="text-muted">Max 500 characters</small>
                            </div>
                        </div>

                        {/* Mint Button */}
                        <div className="text-center mt-4">
                            <button
                                className={`btn btn-modern btn-lg ${isMinting ? 'disabled' : ''}`}
                                onClick={handleMint}
                                disabled={isMinting || !file || !title || !description}
                                style={{ minWidth: '200px' }}
                            >
                                {isMinting ? (
                                    <>
                                        <div className="loading-spinner d-inline-block me-2"></div>
                                        Minting...
                                    </>
                                ) : (
                                    'Mint NFT'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mint;
