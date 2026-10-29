import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'
import { BookProvider } from '../context/BookContext.jsx'

const setup = (route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <BookProvider><App /></BookProvider>
    </MemoryRouter>
  )

async function addBook(title, author) {
  await userEvent.type(screen.getByLabelText('Judul'), title)
  await userEvent.type(screen.getByLabelText('Penulis'), author)
  await userEvent.click(screen.getByRole('button', { name: /^tambah$/i }))
}

describe('Integrasi aplikasi', () => {
  it('menambah buku, tampil di daftar, dan tersimpan di localStorage', async () => {
    setup()
    await addBook('Bumi', 'Tere Liye')
    expect(screen.getByRole('heading', { name: 'Bumi' })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('books'))).toHaveLength(1)
  })
  it('pencarian memfilter berdasarkan penulis', async () => {
    setup()
    await addBook('Bumi', 'Tere Liye')
    await addBook('Laskar Pelangi', 'Andrea Hirata')
    await userEvent.type(screen.getByLabelText('Cari buku'), 'andrea')
    expect(screen.queryByRole('heading', { name: 'Bumi' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Laskar Pelangi' })).toBeInTheDocument()
  })
  it('halaman statistik menampilkan total buku', async () => {
    setup()
    await addBook('Bumi', 'Tere Liye')
    await userEvent.click(screen.getByRole('link', { name: 'Statistik' }))
    expect(screen.getByTestId('total')).toHaveTextContent('1')
  })
})
