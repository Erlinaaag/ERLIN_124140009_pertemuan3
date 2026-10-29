import { useBooks } from '../../context/BookContext.jsx'
import useBookStats from '../../hooks/useBookStats.js'
import './Stats.css'

export default function Stats() {
  const { books } = useBooks()
  const stats = useBookStats(books)
  const rows = [
    ['Milik', stats.owned, stats.percent.owned],
    ['Sedang Dibaca', stats.reading, stats.percent.reading],
    ['Ingin Dibeli', stats.wishlist, stats.percent.wishlist],
  ]
  return (
    <div>
      <h1>Statistik</h1>
      <div className="card"><strong>Total buku:</strong> <span data-testid="total">{stats.total}</span></div>
      {rows.map(([label, n, p]) => (
        <div key={label} className="card stat-row">
          <span>{label}: {n} ({p}%)</span>
          <div className="bar"><div style={{ width: `${p}%` }} /></div>
        </div>
      ))}
    </div>
  )
}
