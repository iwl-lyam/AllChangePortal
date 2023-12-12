import React from 'react'
import './App.css'

export default function Home() {
  return (
    <div className="text-light">

        <div className="">
            <div className="p-3 text-white d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                <div className={"text-center"}>
                    <h1 style={{fontSize: 60}}>All Change</h1>
                    <h3>Development studio making a realistic London Underground simulator on Roblox</h3>
                </div>
            </div>

            <div className="p-4 bg-primary justify-content-center align-items-center">
                <div className={"text-center"}>
                    <h3>Upcoming:</h3>
                    <h1>Project Deep Level: Jubilee</h1>
                </div>
            </div>
        </div>
        {/*<div className="bg-secondary text-center p-3 text-white mh-100">*/}
        {/*    <p>Featured Game</p>*/}
        {/*    <h2>Picadilly Line</h2>*/}
        {/*</div>*/}



    </div>
  )
}