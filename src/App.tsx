import React, { useState } from 'react';
import { useEmployees } from './hooks/useEmployees';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import { Employee } from './types';

const App: React.FC = () => {
    const { employees: fetchedEmployees, loading, error } = useEmployees();
    const [employees, setEmployees] = useState<Employee[]>(fetchedEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const addEmployee = (newEmployee: Employee) => {
        newEmployee.id = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
        setEmployees((prev) => [...prev, newEmployee]);
    };

    const updateEmployee = (updatedEmployee: Employee) => {
        setEmployees((prev) =>
            prev.map((employee) =>
                employee.id === updatedEmployee.id ? updatedEmployee : employee
            )
        );
        setEditingEmployee(null); 
    };

    const deleteEmployee = (id: number) => {
        setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Employee Dashboard</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 mb-4 w-full rounded"
            />

            <EmployeeForm 
                addEmployee={addEmployee} 
                updateEmployee={updateEmployee} 
                editingEmployee={editingEmployee} 
                setEditingEmployee={setEditingEmployee}
            />
            
            {filteredEmployees.length > 0 ? (
              <EmployeeList 
                  employees={filteredEmployees} 
                  deleteEmployee={deleteEmployee} 
                  setEditingEmployee={setEditingEmployee}
              />
              ) : (
              <p>No employees found.</p>
              )}
        </div>
    );
};

export default App;