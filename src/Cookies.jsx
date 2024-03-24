import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga'

const CookiePopup = () => {
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setAccepted(true);
        window.dataLayer = window.dataLayer || []
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date())

        gtag('config', 'G-P7M064VNV1')
    };

    const handleClose = () => {
        localStorage.setItem('cookiesAccepted', 'false')
        setAccepted(true);
        let cookies = document.cookie.split("; ");
        for (let c = 0; c < cookies.length; c++) {
            let d = window.location.hostname.split(".");
            while (d.length > 0) {
                let cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
                let p = location.pathname.split('/');
                document.cookie = cookieBase + '/';
                while (p.length > 0) {
                    document.cookie = cookieBase + p.join('/');
                    p.pop();
                }
                d.shift();
            }
        }
    };

    const isAccepted = localStorage.getItem('cookiesAccepted');

    if (isAccepted || accepted) {
        return null; // If cookies are already accepted, don't render the popup
    }

    return (
        <div className="cookie-popup bg-dark fixed-bottom p-2 text-white">
            <div className="container d-flex align-items-center justify-content-between">
                <p className="m-0">This website uses cookies for analytical purposes. No data is sold to advertisers. <a target="_blank" href={"https://allchange.xyz/cdn/uploads/file-1711273087289-901106081.pdf"}>Privacy Policy</a></p>
                <div className="d-flex align-items-center">
                    <button className="btn btn-primary me-2" onClick={handleAccept}>Accept</button>
                    <button type="button" className="btn-close btn-close-white align-middle me-2" aria-label="Close" onClick={handleClose}></button>
                </div>
            </div>
        </div>
    );
};

export default CookiePopup;
