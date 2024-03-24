import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga'

const CookiePopup = () => {
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setAccepted(true);
        ReactGA.initialize('G-P7M064VNV1'); // Initialize after cookie acceptance
        ReactGA.event({
            category: 'Cookie',
            action: 'Accepted',
        });
    };

    const handleClose = () => {
        setAccepted(true);
    };

    const isAccepted = localStorage.getItem('cookiesAccepted');

    if (isAccepted || accepted) {
        return null; // If cookies are already accepted, don't render the popup
    }

    return (
        <div className="cookie-popup bg-dark fixed-bottom p-2 text-white">
            <div className="container d-flex align-items-center justify-content-between">
                <p className="m-0">This website uses cookies for analytical purposes. No data is sold to advertisers.</p>
                <div className="d-flex align-items-center">
                    <button className="btn btn-primary me-2" onClick={handleAccept}>Accept</button>
                    <button type="button" className="btn-close btn-close-white align-middle me-2" aria-label="Close" onClick={handleClose}></button>
                </div>
            </div>
        </div>
    );
};

export default CookiePopup;
