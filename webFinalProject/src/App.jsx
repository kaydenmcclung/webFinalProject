//import { useState } from 'react'
import './App.css'

import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <div>
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
