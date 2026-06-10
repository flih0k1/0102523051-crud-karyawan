# 0102523051-crud-karyawan
Web Manajemen Data Karyawan berbasis Next.js 14 (App Router), Prisma ORM, dan MySQL Laragon. Dilengkapi fitur CRUD lengkap dengan handling File Upload, Cascading Dropdown, Validasi Email, Search &amp; Filter, serta Pagination.

# 0102523051 - Manajemen Data Karyawan (CRUD Next.js + Prisma + MySQL)

Proyek ini merupakan aplikasi web **Manajemen Data Karyawan** yang dibangun menggunakan **Next.js 14 (App Router)**, **TypeScript**, **Prisma ORM**, dan database **MySQL** melalui **Laragon**. [cite_start]Proyek ini melatih penanganan berbagai tipe input HTML umum (Text, Email, Radio, Dropdown, Cascading Dropdown, Checkbox, dan File Upload) dalam satu proyek nyata[cite: 4, 12, 13, 14, 15, 16, 17].

## 🚀 Fitur Utama & Tugas Mandiri

[cite_start]Aplikasi ini telah memenuhi seluruh spesifikasi modul dasar beserta **Tugas Mandiri**[cite: 1, 145]:
1. [cite_start]**CRUD Lengkap**: Fitur tambah data, baca data relasional, ubah (edit), dan hapus data karyawan beserta berkas fotonya[cite: 3, 18, 147].
2. [cite_start]**Cascading Dropdown**: Pilihan Jabatan yang isinya berubah secara dinamis bergantung pada Departemen yang dipilih[cite: 14, 143].
3. [cite_start]**Many-to-Many Relation**: Implementasi pilihan *Skill* karyawan menggunakan Checkbox yang terelasi secara *many-to-many* di database[cite: 16, 35, 141].
4. [cite_start]**Upload Foto**: Menyimpan file foto profil karyawan ke penyimpanan lokal (`public/uploads`) menggunakan Node.js built-in `fs`[cite: 10, 17, 67].
5. [cite_start]**[TUGAS MANDIRI] Fitur Edit**: Halaman khusus untuk memperbarui informasi karyawan yang sudah terdaftar tanpa merusak relasi data lama[cite: 147].
6. [cite_start]**[TUGAS MANDIRI] Search & Filter**: Pencarian data karyawan berdasarkan komponen nama serta filter instan berdasarkan status keaktifan[cite: 148].
7. [cite_start]**[TUGAS MANDIRI] Validasi Form**: Proteksi pada Server Action untuk mencegah pendaftaran dengan alamat email yang sudah ada di database[cite: 149].
8. [cite_start]**[TUGAS MANDIRI] Pagination**: Membatasi tampilan data maksimal 5 karyawan per halaman menggunakan parameter `skip` dan `take` pada Prisma ORM[cite: 150].

---

## 🛠️ Stack Teknologi

* [cite_start]**Framework:** Next.js 14 (App Router) [cite: 6]
* [cite_start]**Bahasa:** TypeScript [cite: 7]
* [cite_start]**Styling:** Tailwind CSS [cite: 22]
* [cite_start]**ORM:** Prisma ORM [cite: 8]
* [cite_start]**Database:** MySQL (via Laragon & HeidiSQL) [cite: 9]

---

## 💻 Langkah Instalasi & Menjalankan Lokal

### 1. Kloning Repositori
```bash
git clone [https://github.com/USERNAME_KAMU/REPOSITORI_KAMU.git](https://github.com/USERNAME_KAMU/REPOSITORI_KAMU.git)
cd REPOSITORI_KAMU
