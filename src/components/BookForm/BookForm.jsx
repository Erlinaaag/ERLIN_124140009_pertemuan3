import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './BookForm.css'

const EMPTY = { title: '', author: '', status: 'milik' }

/**
 * Form tambah / edit buku (reusable).
 * Jika `initialData` diberikan, form berada dalam mode edit.
 */
export default function BookForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || EMPTY)
  const [errors, setErrors] = useState({})

  // Sinkronkan isi form ketika buku yang diedit berganti
  useEffect(() => {
    setForm(initialData || EMPTY)
    setErrors({})
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' })) // hapus error saat user mengetik
  }

  // Validasi: judul & penulis wajib diisi
  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Judul wajib diisi'
    if (!form.author.trim()) errs.author = 'Penulis wajib diisi'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    onSubmit({ title: form.title.trim(), author: form.author.trim(), status: form.status })
    if (!initialData) setForm(EMPTY) // reset hanya pada mode tambah
  }

  return (
    <form className="book-form card" onSubmit={handleSubmit} noValidate>
      <h2>{initialData ? 'Edit Buku' : 'Tambah Buku'}</h2>

      <label htmlFor="title">Judul</label>
      <input id="title" name="title" value={form.title} onChange={handleChange}
        className={errors.title ? 'input-error' : ''} aria-invalid={!!errors.title} />
      {errors.title && <span role="alert" className="error-text">{errors.title}</span>}

      <label htmlFor="author">Penulis</label>
      <input id="author" name="author" value={form.author} onChange={handleChange}
        className={errors.author ? 'input-error' : ''} aria-invalid={!!errors.author} />
      {errors.author && <span role="alert" className="error-text">{errors.author}</span>}

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={form.status} onChange={handleChange}>
        <option value="milik">Milik</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>

      <div className="form-actions">
        <button type="submit">{initialData ? 'Simpan Perubahan' : 'Tambah'}</button>
        {onCancel && <button type="button" className="secondary" onClick={onCancel}>Batal</button>}
      </div>
    </form>
  )
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
  }),
  onCancel: PropTypes.func,
}
BookForm.defaultProps = { initialData: null, onCancel: null }
