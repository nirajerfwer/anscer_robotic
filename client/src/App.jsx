import { useState } from 'react';
import './App.css'
import HomeComponent from './component/home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent/>} />
        <Route path="/:id" element={<HomeComponent/>} />
      </Routes>
    </Router>
  )
}

export default App
