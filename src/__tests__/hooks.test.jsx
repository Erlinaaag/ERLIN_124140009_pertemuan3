import { renderHook, act } from '@testing-library/react'
import useBookStats from '../hooks/useBookStats.js'
import useLocalStorage from '../hooks/useLocalStorage.js'

const books = [
  { id: '1', title: 'A', author: 'X', status: 'milik' },
  { id: '2', title: 'B', author: 'Y', status: 'baca' },
  { id: '3', title: 'C', author: 'Z', status: 'baca' },
  { id: '4', title: 'D', author: 'W', status: 'beli' },
]

describe('useBookStats', () => {
  it('menghitung jumlah per status dan persentase', () => {
    const { result } = renderHook(() => useBookStats(books))
    expect(result.current.total).toBe(4)
    expect(result.current.reading).toBe(2)
    expect(result.current.percent.reading).toBe(50)
  })
  it('mengembalikan 0 jika daftar kosong', () => {
    const { result } = renderHook(() => useBookStats([]))
    expect(result.current.total).toBe(0)
    expect(result.current.percent.owned).toBe(0)
  })
})

describe('useLocalStorage', () => {
  it('menyimpan nilai ke localStorage saat state berubah', () => {
    const { result } = renderHook(() => useLocalStorage('k', []))
    act(() => result.current[1](['halo']))
    expect(JSON.parse(localStorage.getItem('k'))).toEqual(['halo'])
  })
  it('membaca nilai awal dari localStorage', () => {
    localStorage.setItem('k2', JSON.stringify('tersimpan'))
    const { result } = renderHook(() => useLocalStorage('k2', 'default'))
    expect(result.current[0]).toBe('tersimpan')
  })
})
