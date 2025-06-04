import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './views/Home.view'
import { Navbar } from './Compenents/Navbar/Navbar.compenent'

function App() {
  
  return (
    <>
      <header>
        <Navbar/>
      </header>
     <Routes>
        <Route path='/' element={<Home />} />
     </Routes> 
    </>
  )
}

export default App
