# 📚 Aplikasi Manajemen Buku Pribadi

**Nama:** Erlin  |  **NIM:** 124140009  |  **Pertemuan 3**

## Deskripsi
Aplikasi untuk mencatat buku yang **dimiliki**, **sedang dibaca**, atau **ingin dibeli**.
Fitur: tambah/edit/hapus buku, filter status, pencarian judul/penulis, halaman statistik,
validasi form, dan penyimpanan persisten di `localStorage`.

## Instalasi & Menjalankan
```bash
npm install
npm run dev      # jalankan aplikasi (http://localhost:5173)
npm test         # jalankan unit test
npm run build    # build produksi
```
(Jika membuat dari nol: `npm create vite@latest ERLIN_124140009_pertemuan3 -- --template react`,
lalu `npm install react-router-dom prop-types` dan
`npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`.)

## Fitur React yang Digunakan
| Konsep | Lokasi |
|---|---|
| `useState` | `BookForm`, `Home`, `BookContext` |
| `useEffect` | `useLocalStorage` (sinkron storage), `BookForm` (sinkron data edit) |
| `useMemo` | `useBookStats`, `filteredBooks` di `BookContext` |
| Context API | `src/context/BookContext.jsx` (state buku, filter, CRUD) |
| React Router | `App.jsx` (`/`, `/stats`, 404), `Navbar` (`NavLink`) |
| Custom Hooks | `useLocalStorage`, `useBookStats` |
| Komponen reusable | `BookForm`, `BookList`, `BookItem`, `BookFilter`, `Navbar` |
| PropTypes | Seluruh komponen |
| Error handling | Validasi wajib isi di `BookForm` + border merah & pesan error |

## Struktur Folder
```
src/
├── components/ (BookForm, BookList, BookFilter, Navbar)
├── pages/      (Home, Stats)
├── hooks/      (useLocalStorage.js, useBookStats.js)
├── context/    (BookContext.jsx)
├── __tests__/  (hooks, components, App integrasi)
└── App.jsx
```

## Laporan Testing
Jalankan `npm test`, lalu simpan screenshot terminal ke `screenshots/test-report.png`.

![Hasil Test](screenshots/test-report.png)

Total **13 test** (hooks, komponen, integrasi).

## Screenshoot 
hasil screenshoot ada di assets
