import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './views/Home.view'
import { Navbar } from './Compenents/Navbar/Navbar.compenent'
import { SearchCandidates } from './Compenents/Candidates/Candidates.component'

function App() {
  
  return (
    <>
      <header>
        <Navbar/>
      </header>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<SearchCandidates />} />
     </Routes> 
    </>
  )
}

export default App
