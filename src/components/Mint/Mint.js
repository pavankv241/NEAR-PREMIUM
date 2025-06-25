import React, { useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { NearContext } from '@/wallets/near';
import 'bootstrap/dist/css/bootstrap.min.css';

const Mint = ({ uploadToPinata, mintNFT }) => {
    const { signedAccountId } = useContext(NearContext);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [premiumAmount, setPremiumAmount] = useState('');
    const [normalAmount, setNormalAmount] = useState('');
    const [premiumDays, setPremiumDays] = useState('');
    const [isMinting, setIsMinting] = useState(false);
    const [isDragover, setIsDragover] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 
            'video/*': ['.mp4', '.webm', '.mov', '.avi', '.mkv']
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

    const clearVideo = () => {
        if (file && file.preview) {
            URL.revokeObjectURL(file.preview);
        }
        setFile(null);
    };

    const handleUpload = async () => {
        if (!signedAccountId) {
            alert('Please connect your wallet first!');
            return;
        }

        if (!file || !title || !description || !premiumAmount || !normalAmount || !premiumDays) {
            alert('Please complete all fields');
            return;
        }

        setIsMinting(true);

        try {
            const IpfsHash = await uploadToPinata(file);
            await mintNFT(title, description, IpfsHash, premiumAmount, normalAmount, premiumDays);
            clearVideo();
            setTitle('');
            setDescription('');
            setPremiumAmount('');
            setNormalAmount('');
            setPremiumDays('');
        } catch (e) {
            console.log(e);
        } finally {
            setIsMinting(false);
        }
    };

    if (!signedAccountId) {
        return (
            <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
                <div className="card text-center" style={{ maxWidth: '500px' }}>
                    <div className="card-body p-5">
                        <div className="mb-4">
                            <span className="fs-1 text-primary">🔐</span>
                        </div>
                        <h3 className="fw-bold mb-3">Wallet Required</h3>
                        <p className="text-muted mb-4">
                            Please connect your NEAR wallet to start uploading premium videos
                        </p>
                        <button className="btn btn-primary">
                            Connect Wallet
                        </button>
                    </div>
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
                        <h2 className="fw-bold mb-3">Upload Premium Video</h2>
                        <p className="text-muted">Share your exclusive video content and monetize it with NFT-based access control</p>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            {/* Video Upload Section */}
                            <div className="mb-4">
                                <h5 className="fw-bold mb-3">Upload Your Video</h5>
                                <div 
                                    {...getRootProps({ 
                                        className: `border-2 border-dashed rounded p-5 text-center ${isDragover ? 'border-primary bg-light' : 'border-muted'}` 
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    {file ? (
                                        <div className="text-center">
                                            <video 
                                                src={file.preview} 
                                                controls 
                                                className="img-fluid rounded mb-3" 
                                                style={{ maxHeight: '300px', maxWidth: '100%' }}
                                            />
                                            <div className="d-flex justify-content-center gap-2">
                                                <button 
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        clearVideo();
                                                    }}
                                                >
                                                    Remove Video
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <div className="mb-3">
                                                <span className="fs-1 text-primary">🎬</span>
                                            </div>
                                            <h6 className="fw-bold">Drag & Drop your video here</h6>
                                            <p className="text-muted mb-3">or click to browse</p>
                                            <p className="text-muted small">
                                                Supports: MP4, WebM, MOV, AVI, MKV
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Video Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter a compelling title for your video"
                                        maxLength={50}
                                    />
                                    <small className="text-muted">Max 50 characters</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Description</label>
                                    <textarea
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe your premium video content"
                                        rows="3"
                                        maxLength={500}
                                    />
                                    <small className="text-muted">Max 500 characters</small>
                                </div>
                            </div>

                            {/* Premium/Normal Amount and Days Fields */}
                            <div className="row g-3 mt-3">
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Premium Amount (NEAR)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={premiumAmount}
                                        onChange={(e) => setPremiumAmount(e.target.value)}
                                        placeholder="e.g. 2.5"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Normal Amount (NEAR)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={normalAmount}
                                        onChange={(e) => setNormalAmount(e.target.value)}
                                        placeholder="e.g. 1.0"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Premium Days</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={premiumDays}
                                        onChange={(e) => setPremiumDays(e.target.value)}
                                        placeholder="e.g. 3"
                                        min="1"
                                        step="1"
                                    />
                                </div>
                            </div>

                            {/* Upload Button */}
                            <div className="text-center mt-4">
                                <button
                                    className={`btn btn-primary btn-lg ${isMinting ? 'disabled' : ''}`}
                                    onClick={handleUpload}
                                    disabled={isMinting || !file || !title || !description || !premiumAmount || !normalAmount || !premiumDays}
                                    style={{ minWidth: '200px' }}
                                >
                                    {isMinting ? (
                                        <>
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            Uploading...
                                        </>
                                    ) : (
                                        'Upload Premium Video'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mint;
