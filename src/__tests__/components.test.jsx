import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BookForm from '../components/BookForm/BookForm.jsx'
import BookFilter from '../components/BookFilter/BookFilter.jsx'
import BookList from '../components/BookList/BookList.jsx'

describe('BookForm', () => {
  it('menampilkan error & tidak submit jika kolom kosong', async () => {
    const onSubmit = vi.fn()
    render(<BookForm onSubmit={onSubmit} />)
    await userEvent.click(screen.getByRole('button', { name: /tambah/i }))
    expect(screen.getByText('Judul wajib diisi')).toBeInTheDocument()
    expect(screen.getByText('Penulis wajib diisi')).toBeInTheDocument()
    expect(screen.getByLabelText('Judul')).toHaveClass('input-error')
    expect(onSubmit).not.toHaveBeenCalled()
  })
  it('memanggil onSubmit dengan data valid', async () => {
    const onSubmit = vi.fn()
    render(<BookForm onSubmit={onSubmit} />)
    await userEvent.type(screen.getByLabelText('Judul'), 'Laskar Pelangi')
    await userEvent.type(screen.getByLabelText('Penulis'), 'Andrea Hirata')
    await userEvent.selectOptions(screen.getByLabelText('Status'), 'baca')
    await userEvent.click(screen.getByRole('button', { name: /tambah/i }))
    expect(onSubmit).toHaveBeenCalledWith({ title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'baca' })
  })
  it('mode edit mengisi form dengan data awal', () => {
    render(<BookForm onSubmit={() => {}} initialData={{ id: '1', title: 'T', author: 'A', status: 'beli' }} />)
    expect(screen.getByLabelText('Judul')).toHaveValue('T')
    expect(screen.getByRole('button', { name: /simpan perubahan/i })).toBeInTheDocument()
  })
})

describe('BookFilter', () => {
  it('memanggil callback saat mengetik dan mengganti status', async () => {
    const onQ = vi.fn(), onS = vi.fn()
    render(<BookFilter status="semua" onStatusChange={onS} query="" onQueryChange={onQ} />)
    await userEvent.type(screen.getByLabelText('Cari buku'), 'a')
    await userEvent.selectOptions(screen.getByLabelText('Filter status'), 'beli')
    expect(onQ).toHaveBeenCalledWith('a')
    expect(onS).toHaveBeenCalledWith('beli')
  })
})

describe('BookList', () => {
  const books = [{ id: '1', title: 'Bumi', author: 'Tere Liye', status: 'milik' }]
  it('menampilkan buku dan memanggil onDelete', async () => {
    const onDelete = vi.fn()
    render(<BookList books={books} onEdit={() => {}} onDelete={onDelete} />)
    expect(screen.getByText('Bumi')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /hapus/i }))
    expect(onDelete).toHaveBeenCalledWith('1')
  })
  it('menampilkan pesan kosong', () => {
    render(<BookList books={[]} onEdit={() => {}} onDelete={() => {}} />)
    expect(screen.getByText(/belum ada buku/i)).toBeInTheDocument()
  })
})
