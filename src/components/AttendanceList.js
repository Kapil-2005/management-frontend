import React, { useEffect, useState } from 'react';
import { getRecords } from '../services/recordService';

function AttendanceList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // We'll use getRecords since Express backend includes attendance in employee objects
    getRecords()
      .then(res => {
        // Flatten the records to show a list of all attendance entries
        const allAttendance = [];
        res.data.forEach(emp => {
          if (emp.attendanceHistory) {
            Object.entries(emp.attendanceHistory).forEach(([date, status]) => {
              allAttendance.push({ id: emp._id, name: emp.name, date, status });
            });
          }
        });
        setRecords(allAttendance);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Attendance</h2>
      <ul>
        {records.map(rec => (
          <li key={rec.id}>
            {rec.employee} - {rec.date} - {rec.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceList;
