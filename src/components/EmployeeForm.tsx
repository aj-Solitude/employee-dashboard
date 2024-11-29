import React, { useEffect, useState } from 'react';
import { Employee } from '../types';

interface EmployeeFormProps {
    addEmployee: (employee: Employee) => void;
    updateEmployee: (employee: Employee) => void;
    editingEmployee: Employee | null;
    setEditingEmployee: (employee: Employee | null) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ addEmployee, updateEmployee, editingEmployee, setEditingEmployee }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (editingEmployee) {
            setName(editingEmployee.name);
            setEmail(editingEmployee.email);
            setDepartment(editingEmployee.department || '');
            setDesignation(editingEmployee.designation || '');
        }
    }, [editingEmployee]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) {
            setErrorMessage('Name and Email are required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email format');
            return;
        }

        let newOrUpdatedEmp;

        if (editingEmployee) {
            newOrUpdatedEmp = { ...editingEmployee, name, email, department, designation };
            updateEmployee(newOrUpdatedEmp);
        } else {
            newOrUpdatedEmp = {
                id: Math.floor(Math.random() * 1000000), // This will be overridden in App.tsx
                name,
                email,
                department,
                designation,
            };
            addEmployee(newOrUpdatedEmp);
        }

        resetForm();
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setDepartment('');
        setDesignation('');
        setErrorMessage('');
        setEditingEmployee(null);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-6 border rounded-lg shadow-md bg-gray-50">
            <h2 className="text-xl font-bold mb-4">{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            
            <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="border p-3 m-1 w-full rounded focus:outline-none focus:ring"
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="border p-3 m-1 w-full rounded focus:outline-none focus:ring"
            />
            <input 
                type="text" 
                placeholder="Department" 
                value={department} 
                onChange={(e) => setDepartment(e.target.value)} 
                className="border p-3 m-1 w-full rounded focus:outline-none focus:ring"
            />
            <input 
                type="text" 
                placeholder="Designation" 
                value={designation} 
                onChange={(e) => setDesignation(e.target.value)} 
                className="border p-3 m-1 w-full rounded focus:outline-none focus:ring"
            />
            
            {!editingEmployee ? (
              <button type="submit" className='bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition'>
                  Add Employee
              </button>
              ) : (
              <button type='submit' className='bg-green-600 text-white p-3 rounded hover:bg-green-700 transition'>
                  Update Employee
              </button>
          )}

          {editingEmployee && (
              <button type='button' onClick={resetForm} className='bg-gray-500 text-white p-3 rounded hover:bg-gray-700 transition ml-2'>
                  Cancel
              </button>
          )}
        </form>
    );
};

export default EmployeeForm;