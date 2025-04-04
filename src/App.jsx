import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import ComingSoon from './pages/ComingSoon'
import NowPlaying from './pages/NowPlaying'
import Popular from './pages/Popular'
import Header from './components/Header'

function App() {


  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/nowPlaying" element={<NowPlaying />} />
        <Route path="/comingSoon" element={<ComingSoon />} />
      </Routes>
    </Router>
  )
}

export default App
