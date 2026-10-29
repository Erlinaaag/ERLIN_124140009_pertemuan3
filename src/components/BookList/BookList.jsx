import PropTypes from 'prop-types'
import BookItem, { bookShape } from './BookItem.jsx'
import './BookList.css'

/** Daftar buku; menampilkan pesan jika kosong. */
export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) return <p className="empty">Belum ada buku yang cocok.</p>
  return (
    <ul className="book-list">
      {books.map((b) => (
        <BookItem key={b.id} book={b} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}

BookList.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
