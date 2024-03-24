import React from 'react'

export default function UserSettings() {
    return (
        <div>
            <p><em>No current functionality, only for show</em></p>
            <p><strong>Basic options</strong></p>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="firstBox" />
                <label className="form-check-label" htmlFor="firstBox">Dark mode</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="secondBox" />
                <label className="form-check-label" htmlFor="secondBox">Allow analytics cookies</label>
            </div>
        </div>
    )
}