import React, { useState } from 'react';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';
import AttendanceList from './AttendanceList';

function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <AddEmployee onAdded={() => setRefresh(!refresh)} />
      <EmployeeList refresh={refresh} />
      <AttendanceList />
    </div>
  );
}

export default Dashboard;
