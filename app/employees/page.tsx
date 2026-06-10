import { prisma } from '@/lib/prisma';
import EmployeeForm from './EmployeeForm';
import { deleteEmployee } from './actions';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  searchParams: Promise<{ query?: string; status?: string; page?: string }>;
};

export default async function EmployeesPage({ searchParams }: Props) {
  // Sesuai aturan Next.js terbaru, unwrap searchParams terlebih dahulu
  const params = await searchParams;
  const query  = params.query ?? '';
  const status = params.status ?? '';
  
  // TUGAS MANDIRI 4: Konfigurasi Pagination (5 data per halaman)
  const currentPage = parseInt(params.page ?? '1');
  const limit = 5;
  const skip  = (currentPage - 1) * limit;

  // Ambil data master untuk form
  const departments = await prisma.department.findMany();
  const positions   = await prisma.position.findMany();  
  const skills      = await prisma.skill.findMany();

  // Susun kriteria filter untuk query ke database Laragon
  const whereClause: any = {
    AND: [
      query ? { name: { contains: query } } : {},
      status ? { status: status } : {},
    ],
  };

  // Ambil total data untuk menghitung halaman maksimal pagination
  const totalEmployees = await prisma.employee.count({ where: whereClause });
  const totalPages = Math.ceil(totalEmployees / limit);

  // Ambil data karyawan dengan filter dan pagination (take & skip)
  const employees = await prisma.employee.findMany({
    where: whereClause,
    include: {
      skills: true,
      position: { include: { department: true } },    
    },    
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: skip,
  });

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8 min-h-screen bg-gray-50 text-black">
      <h1 className="text-2xl font-bold">Manajemen Karyawan</h1>
      
      <EmployeeForm departments={departments} positions={positions} skills={skills} />

      {/* TUGAS MANDIRI 2: Komponen Search Bar & Filter Status */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4 items-center justify-between">
        <form method="GET" className="flex gap-2 w-full sm:w-auto flex-1">
          <input
            type="text"
            name="query"
            defaultValue={query}
            placeholder="Cari nama karyawan..."
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <select
            name="status"
            defaultValue={status}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="probation">Masa Percobaan</option>
            <option value="inactive">Tidak Aktif</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            Filter
          </button>
        </form>
        {query || status ? (
          <Link href="/employees" className="text-sm text-red-500 hover:underline">Reset Pencarian</Link>
        ) : null}
      </div>

      {/* TABEL DATA */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">   
          <h2 className="text-lg font-semibold">Data Karyawan ({totalEmployees})</h2>
          <span className="text-xs text-gray-500">Halaman {currentPage} dari {totalPages || 1}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-xs uppercase border-b text-gray-700">
              <tr>       
                <th className="px-4 py-3">Foto</th>
                <th className="px-4 py-3">Nama & Email</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Jabatan & Dept.</th>
                <th className="px-4 py-3">Skill</th>       
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.length === 0 && (            
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">Data tidak ditemukan.</td>
                </tr>
              )}
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {emp.photoPath ? (
                      <Image src={emp.photoPath} alt={emp.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />    
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">N/A</div>     
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{emp.name}</p>  
                    <p className="text-gray-400 text-xs">{emp.email}</p>
                  </td>
                  <td className="px-4 py-3 capitalize">{emp.gender === 'male' ? '👨 Laki-laki' : '👩 Perempuan'}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{emp.position.name}</p>     
                    <p className="text-gray-400 text-xs">{emp.position.department.name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {emp.skills.map((s) => (
                        <span key={s.id} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{s.name}</span>
                      ))}
                    </div>    
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${                 
                      emp.status === 'active' ? 'bg-green-100 text-green-700' : 
                      emp.status === 'probation' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'                   
                    }`}>{emp.status === 'active' ? 'Aktif' : emp.status === 'probation' ? 'Masa Percobaan' : 'Tidak Aktif'}</span>
                  </td>
                  <td className="px-4 py-3">               
                    <div className="flex items-center gap-3">
                      {/* TUGAS MANDIRI 1: Navigasi Link menuju halaman Edit */}
                      <Link href={`/employees/${emp.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">
                        Edit
                      </Link>
                      <form action={deleteEmployee.bind(null, emp.id)}>
                        <button type="submit" className="text-red-500 hover:text-red-700 font-medium">Hapus</button>     
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TUGAS MANDIRI 4: Komponen Kontrol Halaman Navigasi Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-center gap-2">
            <Link
              href={`/employees?query=${query}&status=${status}&page=${currentPage - 1}`}
              className={`px-3 py-1 border text-xs font-medium rounded bg-white ${currentPage <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}`}
            >
              Sebelumnya
            </Link>
            <span className="text-xs text-gray-700 font-medium">Halaman {currentPage} dari {totalPages}</span>
            <Link
              href={`/employees?query=${query}&status=${status}&page=${currentPage + 1}`}
              className={`px-3 py-1 border text-xs font-medium rounded bg-white ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}`}
            >
              Selanjutnya
            </Link>
          </div>
        )}
      </div> 
    </main>
  );
}