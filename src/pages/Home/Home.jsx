import { useState } from 'react'
import { useBooks } from '../../context/BookContext.jsx'
import BookForm from '../../components/BookForm/BookForm.jsx'
import BookList from '../../components/BookList/BookList.jsx'
import BookFilter from '../../components/BookFilter/BookFilter.jsx'
import './Home.css'

export default function Home() {
  const { filteredBooks, statusFilter, query, setStatusFilter, setQuery, addBook, updateBook, deleteBook } = useBooks()
  const [editingBook, setEditingBook] = useState(null) // null = mode tambah

  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data)
      setEditingBook(null)
    } else {
      addBook(data)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Hapus buku ini?')) {
      deleteBook(id)
      if (editingBook?.id === id) setEditingBook(null)
    }
  }

  return (
    <div className="home">
      <h1>Koleksi Buku</h1>
      <BookForm onSubmit={handleSubmit} initialData={editingBook} onCancel={editingBook ? () => setEditingBook(null) : null} />
      <BookFilter status={statusFilter} onStatusChange={setStatusFilter} query={query} onQueryChange={setQuery} />
      <BookList books={filteredBooks} onEdit={setEditingBook} onDelete={handleDelete} />
    </div>
  )
}
