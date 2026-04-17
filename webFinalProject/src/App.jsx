//import { useState } from 'react'
import './App.css'
import Dashboard from './routes/Dashboard'
import AddTransaction from './routes/AddTransaction'
import History from './routes/History'
import Reports from './routes/Reports'
import Insights from './routes/Insights'
import Navbar from "./components/Navbar"
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path ='/' element={<Dashboard />}/>
          <Route path ='/addtransaction' element={<AddTransaction />}/>
          <Route path ='/history' element={<History />}/>
          <Route path ='/reports' element={<Reports />}/>
          <Route path ='/insights' element={<Insights />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
