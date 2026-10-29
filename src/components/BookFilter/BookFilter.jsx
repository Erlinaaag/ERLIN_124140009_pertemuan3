import PropTypes from 'prop-types'
import './BookFilter.css'

/** Kontrol pencarian (judul/penulis) dan filter status. */
export default function BookFilter({ status, onStatusChange, query, onQueryChange }) {
  return (
    <div className="book-filter card">
      <input type="search" placeholder="Cari judul atau penulis..." aria-label="Cari buku"
        value={query} onChange={(e) => onQueryChange(e.target.value)} />
      <select aria-label="Filter status" value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="semua">Semua</option>
        <option value="milik">Milik</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>
    </div>
  )
}

BookFilter.propTypes = {
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
}
