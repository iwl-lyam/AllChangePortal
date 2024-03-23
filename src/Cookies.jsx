import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Button } from 'react-bootstrap';

function CookiesConsentBanner() {
    const offcanvasRef = useRef(null);

    useEffect(() => {
        if (offcanvasRef.current) {
            const offcanvas = new window.bootstrap.Offcanvas(offcanvasRef.current);
            offcanvas.show();
        }
    }, []);

    const handleAccept = () => {
        // Add your accept logic here
        offcanvasRef.current.hide();
    };

    const handleDecline = () => {
        // Add your decline logic here
        offcanvasRef.current.hide();
    };

    return (
        <Offcanvas placement="bottom" id="cookiesBanner" data-bs-backdrop="static" ref={offcanvasRef}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cookies Consent</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <p>This website uses cookies to ensure you get the best experience on our website.</p>
                <Button variant="primary" onClick={handleAccept}>Accept</Button>
                <Button variant="outline-secondary" className="ms-2" onClick={handleDecline}>Decline</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default CookiesConsentBanner;
