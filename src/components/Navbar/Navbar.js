import { useEffect, useState, useContext } from 'react';
import { NearContext } from '@/wallets/near';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export const Navbar = ({onRouteChange}) => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => {});
  const [label, setLabel] = useState('Loading...');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Disconnect ${signedAccountId.slice(0, 8)}...${signedAccountId.slice(-4)}`);
    } else {
      setAction(() => async () => {
        setIsConnecting(true);
        try {
          await wallet.signIn();
        } catch (error) {
          console.error('Connection error:', error);
        } finally {
          setIsConnecting(false);
        }
      });
      setLabel('Connect Wallet');
    }
  }, [signedAccountId, wallet]);

  return (
    <nav className="navbar navbar-expand-lg fixed-top nav-modern">
      <div className="container">
        <a 
          className="navbar-brand gradient-text fw-bold fs-3" 
          onClick={() => onRouteChange("home")}
          style={{ cursor: 'pointer' }}
        >
          Ignitus Networks
        </a>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a 
                className="nav-link fw-medium" 
                onClick={() => onRouteChange("explore")}
                style={{ cursor: 'pointer' }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link fw-medium" 
                onClick={() => onRouteChange("mint")}
                style={{ cursor: 'pointer' }}
              >
                Mint NFT
              </a>
            </li>
            {/* Burn Log functionality temporarily disabled
            <li className="nav-item">
              <a 
                className="nav-link fw-medium" 
                onClick={() => onRouteChange("log")}
                style={{ cursor: 'pointer' }}
              >
                Burn Log
              </a>
            </li>
            */}
          </ul>
          
          <div className="d-flex align-items-center">
            {signedAccountId && (
              <div className="me-3">
                <span className="badge bg-success rounded-pill">
                  Connected
                </span>
              </div>
            )}
            <button
              type="button"
              className="btn btn-modern"
              onClick={action}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <div className="loading-spinner d-inline-block me-2"></div>
                  Connecting...
                </>
              ) : (
                label
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
