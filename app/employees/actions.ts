'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; // 1. TAMBAHKAN IMPORT REDIRECT DI SINI
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// ───────────────────────────────────────────
// ACTION: Tambah Karyawan Baru
// ───────────────────────────────────────────
export async function createEmployee(formData: FormData) {
  const name       = formData.get('name') as string;
  const email      = formData.get('email') as string;
  const gender     = formData.get('gender') as string;
  const status     = formData.get('status') as string;
  const positionId = parseInt(formData.get('positionId') as string);
  const skillIds   = formData.getAll('skills') as string[];
  const photo      = formData.get('photo') as File;

  const existingEmployee = await prisma.employee.findUnique({
    where: { email },
  });

  if (existingEmployee) {
    throw new Error('Email sudah terdaftar! Gunakan email lain.');
  }

  let photoPath: string | null = null;
  if (photo && photo.size > 0) {
    const bytes    = await photo.arrayBuffer();
    const buffer   = Buffer.from(bytes);
    const filename = `${Date.now()}-${photo.name.replace(/\s/g, '_')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath  = path.join(uploadDir, filename);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(filepath, buffer);
    photoPath = `/uploads/${filename}`;
  }

  await prisma.employee.create({
    data: {
      name,
      email,
      gender,
      status,
      positionId,
      photoPath,
      skills: {
        connect: skillIds.map((id) => ({ id: parseInt(id) })),
      },
    },
  });

  revalidatePath('/employees');
  redirect('/employees'); // Otomatis kembali ke halaman utama setelah sukses input
}

// ───────────────────────────────────────────
// ACTION: Update Data Karyawan (Fitur Edit)
// ───────────────────────────────────────────
export async function updateEmployee(id: number, formData: FormData) {
  const name       = formData.get('name') as string;
  const email      = formData.get('email') as string;
  const gender     = formData.get('gender') as string;
  const status     = formData.get('status') as string;
  const positionId = parseInt(formData.get('positionId') as string);
  const skillIds   = formData.getAll('skills') as string[];
  const photo      = formData.get('photo') as File;

  const emailCheck = await prisma.employee.findFirst({
    where: {
      email,
      NOT: { id },
    },
  });

  if (emailCheck) {
    throw new Error('Email sudah digunakan oleh karyawan lain!');
  }

  const currentEmployee = await prisma.employee.findUnique({ where: { id } });
  let photoPath = currentEmployee?.photoPath ?? null;

  if (photo && photo.size > 0) {
    const bytes    = await photo.arrayBuffer();
    const buffer   = Buffer.from(bytes);
    const filename = `${Date.now()}-${photo.name.replace(/\s/g, '_')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath  = path.join(uploadDir, filename);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(filepath, buffer);
    photoPath = `/uploads/${filename}`;
  }

  await prisma.employee.update({
    where: { id },
    data: {
      name,
      email,
      gender,
      status,
      positionId,
      photoPath,
      skills: {
        set: [], 
        connect: skillIds.map((id) => ({ id: parseInt(id) })), 
      },
    },
  });

  revalidatePath('/employees');
  redirect('/employees'); // BARIS UTAMA: Otomatis kembali ke halaman utama setelah sukses edit
}

// ───────────────────────────────────────────
// ACTION: Hapus Karyawan
// ───────────────────────────────────────────
export async function deleteEmployee(id: number) {
  await prisma.employee.delete({ where: { id } });
  revalidatePath('/employees');
}