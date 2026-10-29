import { useState, useEffect } from 'react'

/**
 * Custom hook #1: state yang otomatis tersinkron dengan localStorage.
 * @param {string} key - kunci di localStorage
 * @param {*} initialValue - nilai awal jika belum ada data tersimpan
 */
export default function useLocalStorage(key, initialValue) {
  // Lazy initializer: hanya membaca localStorage saat render pertama
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue // data rusak / storage tidak tersedia
    }
  })

  // Simpan ke localStorage setiap kali value berubah
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error('Gagal menyimpan ke localStorage:', err)
    }
  }, [key, value])

  return [value, setValue]
}
