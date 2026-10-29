import PropTypes from 'prop-types'

const LABEL = { milik: 'Milik', baca: 'Sedang Dibaca', beli: 'Ingin Dibeli' }

/** Satu kartu buku (reusable). */
export default function BookItem({ book, onEdit, onDelete }) {
  return (
    <li className="book-item card">
      <div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <span className={`badge badge-${book.status}`}>{LABEL[book.status]}</span>
      </div>
      <div className="book-actions">
        <button onClick={() => onEdit(book)}>Edit</button>
        <button className="danger" onClick={() => onDelete(book.id)}>Hapus</button>
      </div>
    </li>
  )
}

export const bookShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
})

BookItem.propTypes = {
  book: bookShape.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
