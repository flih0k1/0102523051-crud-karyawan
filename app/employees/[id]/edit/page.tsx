import { prisma } from '@/lib/prisma';
import EditForm from './EditForm';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditEmployeePage({ params }: Props) {
  // Ambil ID dari dynamic route params Next.js
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  // Cari data karyawan di database Laragon berdasarkan ID beserta relasi skill lamanya
  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { skills: true },
  });

  if (!employee) {
    notFound(); // Tampilkan halaman 404 jika ID tidak valid
  }

  // Ambil data master pendukung pilihan form
  const departments = await prisma.department.findMany();
  const positions   = await prisma.position.findMany();
  const skills      = await prisma.skill.findMany();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <EditForm 
        employee={employee} 
        departments={departments} 
        positions={positions} 
        skills={skills} 
      />
    </main>
  );
}