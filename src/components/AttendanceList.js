import React, { useEffect, useState } from 'react';
import API from '../api';

function AttendanceList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    API.get('/attendance/attendance/')
      .then(res => setRecords(res.data))
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
