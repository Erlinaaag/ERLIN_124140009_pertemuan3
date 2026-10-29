import { useMemo } from 'react'

/**
 * Custom hook #2: menghitung statistik koleksi buku.
 * @param {Array} books - daftar buku
 * @returns {{total:number, owned:number, reading:number, wishlist:number, percent:Object}}
 */
export default function useBookStats(books) {
  return useMemo(() => {
    const total = books.length
    const count = (s) => books.filter((b) => b.status === s).length
    const owned = count('milik')
    const reading = count('baca')
    const wishlist = count('beli')
    const pct = (n) => (total === 0 ? 0 : Math.round((n / total) * 100))
    return {
      total,
      owned,
      reading,
      wishlist,
      percent: { owned: pct(owned), reading: pct(reading), wishlist: pct(wishlist) },
    }
  }, [books])
}
