import React from 'react'

export default function Stack({height = "17em", children}) {
    return (
        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0"
             style={{overflowY: "scroll", height: height}} className="scrollspy-example" tabIndex="0">
            {children}
        </div>
    )
}