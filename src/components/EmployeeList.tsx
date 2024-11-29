import React from 'react';
import { Employee } from '../types';

interface EmployeeListProps {
    employees: Employee[];
    deleteEmployee: (id: number) => void;
    setEditingEmployee: (employee: Employee | null) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, deleteEmployee, setEditingEmployee }) => {
    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Employee List</h2>
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="py-3 px-4 border-b">ID</th>
                        <th className="py-3 px-4 border-b">Name</th>
                        <th className="py-3 px-4 border-b">Email</th>
                        <th className="py-3 px-4 border-b">Department</th>
                        <th className="py-3 px-4 border-b">Designation</th>
                        <th className="py-3 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50 transition">
                            <td className="py-2 px-4 border-b">{employee.id}</td> 
                            <td className="py-2 px-4 border-b">{employee.name}</td>
                            <td className="py-2 px-4 border-b">{employee.email}</td>
                            <td className="py-2 px-4 border-b">{employee.department || 'N/A'}</td>
                            <td className="py-2 px-4 border-b">{employee.designation || 'N/A'}</td>
                            <td className="py-2 px-4 border-b flex space-x-1">
                                {/* Edit Button */}
                                <button 
                                    onClick={() => setEditingEmployee(employee)} 
                                    className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </button>
                           
                                <button 
                                    onClick={() => deleteEmployee(employee.id)} 
                                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;