# Product Requirements Document (PRD): Aplikasi Saku (Pengatur Keuangan)

## 1. Ringkasan Eksekutif
Saku adalah aplikasi pencatat pengeluaran harian berbasis web yang dirancang dengan fokus pada kecepatan interaksi dan mobilitas tinggi. Dibangun dengan Next.js, React, TypeScript, Tailwind CSS, dan PostgreSQL, aplikasi ini bertujuan membantu pengguna melacak transaksi berukuran mikro secara instan. Saku memecahkan masalah kebingungan anggaran dengan memisahkan pengeluaran harian, biaya transportasi antarkota, dan biaya hiburan digital ke dalam satu dasbor yang bersih dan minimalis.

## 2. Masalah yang Diselesaikan
*   **"Bocor Halus" Transaksi Mikro:** Pengeluaran rutin bernominal kecil (makan, ngopi, jajan) sering tidak tercatat karena aplikasi keuangan yang ada membutuhkan terlalu banyak langkah (*clicks*) untuk mencatat satu transaksi.
*   **Tumpang Tindih Anggaran (Categorization Issues):** Kesulitan dalam memisahkan anggaran makan harian dengan biaya mobilitas rutin (seperti transportasi antarkota) dan biaya langganan bulanan.
*   **Amnesia Metode Pembayaran:** Kehilangan jejak arus kas karena transaksi tersebar di berbagai metode pembayaran nontunai (QRIS, m-banking, e-wallet) tanpa adanya rekapitulasi tunggal.

## 3. Target Pengguna (Persona)
Aplikasi ini dirancang khusus untuk:
*   Mahasiswa atau individu dengan jadwal padat (kuliah, praktikum lab, rapat kepanitiaan) yang membutuhkan pencatatan keuangan super cepat (di bawah 5 detik per *input*).
*   Individu dengan tingkat mobilitas tinggi, seperti mereka yang sering melakukan perjalanan antarkota secara reguler.
*   Pengguna yang sangat bergantung pada ekosistem transaksi *cashless* (QRIS, transfer bank, e-wallet) untuk menunjang aktivitas sehari-hari.

## 4. Alur Kerja (User Flow)
1.  **Akses Aplikasi:** Pengguna membuka aplikasi melalui *browser* (dioptimalkan untuk *mobile*). Layar langsung menampilkan *Quick Input Form* dan *Dashboard* mini di bagian atas.
2.  **Input Instan (Shortcut):** Pengguna menekan tombol *shortcut* prasetel (misal: "Makan Siang", "Kopi", "Transportasi"). Kategori dan metode pembayaran default akan langsung terisi.
3.  **Input Manual:** Jika transaksi tidak sesuai prasetel, pengguna mengetikkan nominal, memilih kategori dari *dropdown* (atau *drawer*), dan memilih sumber dana (misal: QRIS, BRImo).
4.  **Submit (Server Action):** Pengguna menekan tombol simpan. Data langsung terkirim ke *database* PostgreSQL.
5.  **Pembaruan Dashboard:** Grafik *Real-time Budget Dashboard* di halaman utama langsung diperbarui, memperlihatkan pengurangan sisa kuota jajan hari tersebut dan total pengeluaran bulanan.

## 5. Fitur Utama (Prioritas Fungsional)

### Prioritas 1: Quick Input & Shortcut Buttons
*   **Deskripsi:** Antarmuka *input* satu halaman dengan tombol pintasan (*shortcut*) untuk entri data instan. Mencakup pengisian otomatis untuk aktivitas repetitif.
*   **Kasus Penggunaan:** *User* cukup mengeklik satu tombol untuk transaksi rutin seperti "Makan Siang", "Beli Kopi", atau "Ongkos Shuttle".

### Prioritas 2: Kategorisasi Spesifik (Expense Tagging)
*   **Deskripsi:** Pemisahan kategori secara terstruktur untuk memudahkan analisis pos pengeluaran setiap akhir bulan.
*   **Kasus Penggunaan:** Memisahkan kategori *Kebutuhan Harian* (makan, *laundry*), *Transportasi Antarkota* (shuttle, travel), dan *Hiburan Digital* (langganan *streaming*, *game*).

### Prioritas 3: Real-time Budget Dashboard
*   **Deskripsi:** Visualisasi grafik batang minimalis di bagian atas layar (beranda).
*   **Kasus Penggunaan:** *User* dapat membandingkan total pengeluaran bulan berjalan terhadap batas anggaran bulanan, dan melihat sisa "kuota aman" pengeluaran harian mereka.

### Prioritas 4: Payment Source Tracker
*   **Deskripsi:** Pemilihan sumber dana yang terintegrasi di dalam *form input* untuk mencocokkan saldo aplikasi dengan saldo rekening/e-wallet asli.
*   **Kasus Penggunaan:** Mencatat apakah uang yang keluar berasal dari QRIS, Transfer Bank, Tunai, atau saldo E-Wallet tertentu.

## 6. Spesifikasi Teknis (Tech Stack)
*   **Frontend:** Next.js (App Router), React, TypeScript.
*   **Styling & UI:** Tailwind CSS, dikombinasikan dengan pustaka *headless component* (seperti shadcn/ui) untuk form, *dropdown*, dan *drawer* yang interaktif.
*   **Backend & Database:** PostgreSQL yang dikelola melalui Prisma ORM. Memanfaatkan Next.js *Server Actions* untuk penanganan mutasi data yang cepat, aman, dan meminimalisir penulisan *API routes* manual.
*   **Deployment:** Vercel (Frontend & Serverless Functions), Supabase/Neon (PostgreSQL Database Hosting).

## 7. Out of Scope (Di Luar Cakupan Versi 1)
Fitur-fitur berikut tidak akan dimasukkan dalam Minimum Viable Product (MVP) / Versi 1:
*   Integrasi mutasi otomatis via API pihak ketiga (Bank/E-Wallet). Seluruh aliran data bertumpu pada input manual pengguna.
*   Fungsionalitas pembagian tagihan (*split-bill*) atau pelacakan utang/piutang antar teman.
*   Ekspor data ke format eksternal seperti PDF atau Excel.
*   Manajemen multi-pengguna. Sistem saat ini difokuskan hanya untuk *single-user environment* (aplikasi pribadi).