import './App.css'
import Nav from './Nav'
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Contact from './Contact'
import NoPage from './NoPage'
import Verification from './Verification'
import Home from './Home'
import Interactive from './Interactive'


export default function App() {
  return (
    <div>
      <Nav />
      <div className="p-3">
        <BrowserRouter>
          <Routes>
              <Route index element={<Home />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/*" element={<NoPage />} />
              <Route path="/interactive" element={<Interactive />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}
