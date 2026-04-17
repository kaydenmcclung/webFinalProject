//import { useState } from 'react'
import './App.css'
import Dashboard from './routes/Dashboard'
import AddTransaction from './routes/AddTransaction'
import History from './routes/History'
import Reports from './routes/Reports'
import Insights from './routes/Insights'
import Navbar from "./components/Navbar"
import Sidebar from './components/Sidebar'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <div style={{display:'flex', minHeight:'100vh'}}>
          <Sidebar />
          <main style={{flex:'1', padding:'20px'}}>
            <Routes>
              <Route path ='/' element={<Dashboard />}/>
              <Route path ='/addtransaction' element={<AddTransaction />}/>
              <Route path ='/history' element={<History />}/>
              <Route path ='/reports' element={<Reports />}/>
              <Route path ='/insights' element={<Insights />}/>
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}

export default App
