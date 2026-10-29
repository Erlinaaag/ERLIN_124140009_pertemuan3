import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import Stats from './pages/Stats/Stats.jsx'

// Routing multi-halaman: "/" (Home) dan "/stats" (Statistik)
export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route
            path="*"
            element={
              <p>
                Halaman tidak ditemukan. <Link to="/">Kembali</Link>
              </p>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
