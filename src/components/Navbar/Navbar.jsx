import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <strong>📚 Buku Saya</strong>
      <div>
        <NavLink to="/" end>Beranda</NavLink>
        <NavLink to="/stats">Statistik</NavLink>
      </div>
    </nav>
  )
}
