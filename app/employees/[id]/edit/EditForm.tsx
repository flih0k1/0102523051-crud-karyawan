'use client';

import { useState } from 'react';
import { updateEmployee } from '../../actions';
import Link from 'next/link';

type Department = { id: number; name: string };
type Position   = { id: number; name: string; departmentId: number };
type Skill      = { id: number; name: string };

type Employee = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
  positionId: number;
  skills: { id: number }[];
};

type Props = {
  employee: Employee;
  departments: Department[];
  positions: Position[];
  skills: Skill[];
};

export default function EditForm({ employee, departments, positions, skills }: Props) {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    positions.find((p) => p.id === employee.positionId)?.departmentId.toString() ?? ''
  );

  const filteredPositions = positions.filter(
    (p) => p.departmentId === parseInt(selectedDeptId)
  );

  // Buat fungsi perantara agar ID karyawan terikat dengan benar tanpa menggunakan runtime onClick event handler
  const updateActionWithId = updateEmployee.bind(null, employee.id);

  return (
    <form action={updateActionWithId} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-2xl mx-auto text-black">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Data Karyawan</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
        <input type="text" name="name" required defaultValue={employee.name} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" name="email" required defaultValue={employee.email} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" value="male" defaultChecked={employee.gender === 'male'} required /> Laki-laki</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" value="female" defaultChecked={employee.gender === 'female'} /> Perempuan</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status Karyawan</label>
        <select name="status" defaultValue={employee.status} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="active">Aktif</option>
          <option value="probation">Masa Percobaan</option>
          <option value="inactive">Tidak Aktif</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
          <select value={selectedDeptId} onChange={(e) => setSelectedDeptId(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
            {departments.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
          </select>
        </div>
        <div>         
          <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
          <select name="positionId" defaultValue={employee.positionId} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
            {filteredPositions.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Skill</label>
        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill) => {
            const isChecked = employee.skills.some((s) => s.id === skill.id);
            return (
              <label key={skill.id} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="skills" value={skill.id} defaultChecked={isChecked} className="w-4 h-4 text-blue-600" />
                <span>{skill.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ganti Foto Profil (Kosongkan jika tetap)</label>
        <input type="file" name="photo" accept="image/*" className="w-full text-sm text-gray-600" />
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <Link href="/employees" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300">Batal</Link>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Simpan Perubahan</button>
      </div>
    </form>
  );
}