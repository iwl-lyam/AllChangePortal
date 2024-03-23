import React from 'react'

export default function Nav() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand ms-2 me-2" href="/">
            <img src="https://allchange.xyz/cdn/uploads/file-1707081159730-904261215.png" alt="Bootstrap" width="30" height="30" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/verification">Verification</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true" href="/interactive">Interactive Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dashboards/main">Dashboards</a>
              </li>
            </ul>
          </div>
          <div className="d-flex">
            <button className="btn btn-accent-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
              User settings
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}