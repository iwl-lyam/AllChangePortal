import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga'

const CookiePopup = () => {
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('cookiesAccepted') === "true") {
            window.dataLayer = window.dataLayer || []
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date())

            gtag('config', 'G-P7M064VNV1')

            setAccepted(true)
        }
    })

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
        document.cookie.replace(
            /(?<=^|;).+?(?=\=|;|$)/g,
            name => location.hostname
                .split(/\.(?=[^\.]+\.)/)
                .reduceRight((acc, val, i, arr) => i ? arr[i]='.'+val+acc : (arr[i]='', arr), '')
                .map(domain => document.cookie=`${name}=;max-age=0;path=/;domain=${domain}`)
        );
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
