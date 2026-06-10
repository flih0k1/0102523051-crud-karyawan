HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 0102523051 - Manajemen Data Karyawan (CRUD Next.js + Prisma + MySQL)

Proyek ini merupakan aplikasi web **Manajemen Data Karyawan** yang dibangun menggunakan **Next.js 14 (App Router)**, **TypeScript**, **Prisma ORM**, dan database **MySQL** melalui **Laragon**. Proyek ini melatih penanganan berbagai tipe input HTML umum (Text, Email, Radio, Dropdown, Cascading Dropdown, Checkbox, dan File Upload) dalam satu proyek nyata.

## 🚀 Fitur Utama & Tugas Mandiri

[cite_start]Aplikasi ini telah memenuhi seluruh spesifikasi modul dasar beserta **Tugas Mandiri**[cite: 1, 145]:
1. **CRUD Lengkap**: Fitur tambah data, baca data relasional, ubah (edit), dan hapus data karyawan beserta berkas fotonya.
3. **Many-to-Many Relation**: Implementasi pilihan *Skill* karyawan menggunakan Checkbox yang terelasi secara *many-to-many* di database.
4. **Upload Foto**: Menyimpan file foto profil karyawan ke penyimpanan lokal (`public/uploads`) menggunakan Node.js built-in `fs`.
5. **[TUGAS MANDIRI] Fitur Edit**: Halaman khusus untuk memperbarui informasi karyawan yang sudah terdaftar tanpa merusak relasi data lama.
6. **[TUGAS MANDIRI] Search & Filter**: Pencarian data karyawan berdasarkan komponen nama serta filter instan berdasarkan status keaktifan.
7. **[TUGAS MANDIRI] Validasi Form**: Proteksi pada Server Action untuk mencegah pendaftaran dengan alamat email yang sudah ada di database.
8. **[TUGAS MANDIRI] Pagination**: Membatasi tampilan data maksimal 5 karyawan per halaman menggunakan parameter `skip` dan `take` pada Prisma ORM.

---

## 🛠️ Stack Teknologi

**Framework:** Next.js 14 (App Router) 
**Bahasa:** TypeScript 
**Styling:** Tailwind CSS 
**ORM:** Prisma ORM 
**Database:** MySQL (via Laragon & HeidiSQL) 

---

## 💻 Langkah Instalasi & Menjalankan Lokal

### 1. Kloning Repositori
```bash
git clone [https://github.com/USERNAME_KAMU/REPOSITORI_KAMU.git](https://github.com/USERNAME_KAMU/REPOSITORI_KAMU.git)
cd REPOSITORI_KAMU
1be19f2450f7a88cb5e751d1c68fa7d8776b6bd6
