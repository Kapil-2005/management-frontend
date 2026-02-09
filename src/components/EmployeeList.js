import React, { useEffect, useState } from 'react';
import API from '../api';

function EmployeeList({ refresh }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get('/employees/employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, [refresh]); // refresh pe depend kare

  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.position} ({emp.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
