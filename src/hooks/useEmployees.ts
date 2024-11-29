import { useEffect, useState } from 'react';
import axios from 'axios';
import { Employee } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const useEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get<Employee[]>(API_URL);
            const mappedEmployees = response.data.map(emp => ({
                id: emp.id,
                name: emp.name,
                email: emp.email,
                department: '',
                designation: '' 
            }));
            setEmployees(mappedEmployees);
        } catch (err) {
            setError('Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return { employees, loading, error };
};