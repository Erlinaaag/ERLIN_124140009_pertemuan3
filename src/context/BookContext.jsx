import { createContext, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage.js'

const BookContext = createContext(null)

/** Provider: menyimpan daftar buku (persisten), filter status, dan kata kunci pencarian. */
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', [])
  const [statusFilter, setStatusFilter] = useState('semua')
  const [query, setQuery] = useState('')

  const addBook = (data) =>
    setBooks((prev) => [...prev, { ...data, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }])

  const updateBook = (id, data) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)))

  const deleteBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id))

  // Filter status + pencarian judul/penulis (case-insensitive)
  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase()
    return books.filter((b) => {
      const matchStatus = statusFilter === 'semua' || b.status === statusFilter
      const matchQuery = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      return matchStatus && matchQuery
    })
  }, [books, statusFilter, query])

  const value = {
    books, filteredBooks, statusFilter, query,
    setStatusFilter, setQuery, addBook, updateBook, deleteBook,
  }
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

BookProvider.propTypes = { children: PropTypes.node.isRequired }

/** Hook akses context dengan pengecekan penggunaan di luar Provider. */
// eslint-disable-next-line react-refresh/only-export-components
export function useBooks() {
  const ctx = useContext(BookContext)
  if (!ctx) throw new Error('useBooks harus dipakai di dalam <BookProvider>')
  return ctx
}
