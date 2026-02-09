import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Layout & UI
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Pages
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import RecordList from './components/records/RecordList';
import RecordForm from './components/records/RecordForm';
import RecordDetails from './components/records/RecordDetails';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import MonthlyReport from './pages/MonthlyReport';
import ExpenseReport from './pages/ExpenseReport';

// Styles
import './App.css';
import './components/auth/auth.css';
import './components/ui/ui.css';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />
      <main className="main-wrapper">
        {children}
      </main>
    </div>
  );
};

// Records Page Wrapper to handle modal state
const RecordsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // For forcing refresh

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleView = (record) => {
    setViewingRecord(record);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRefreshKey(prev => prev + 1); // Refresh list
  };

  return (
    <>
      <RecordList key={refreshKey} onEdit={handleEdit} onAdd={handleAdd} onView={handleView} />
      {isModalOpen && (
        <RecordForm
          currentRecord={editingRecord}
          onClose={handleCloseModal}
        />
      )}
      {viewingRecord && (
        <RecordDetails
          record={viewingRecord}
          onClose={() => setViewingRecord(null)}
        />
      )}
    </>
  );
};

function App() {
  console.log("App component rendering");
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout><Dashboard /></Layout>
            </PrivateRoute>
          } />
          <Route path="/records" element={
            <PrivateRoute>
              <Layout><RecordsPage /></Layout>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Layout><Profile /></Layout>
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute>
              <Layout><Settings /></Layout>
            </PrivateRoute>
          } />
          <Route path="/reports" element={
            <PrivateRoute>
              <Layout><Reports /></Layout>
            </PrivateRoute>
          } />
          <Route path="/notifications" element={
            <PrivateRoute>
              <Layout><Notifications /></Layout>
            </PrivateRoute>
          } />
          <Route path="/reports/monthly" element={
            <PrivateRoute>
              <Layout><MonthlyReport /></Layout>
            </PrivateRoute>
          } />
          <Route path="/reports/expenses" element={
            <PrivateRoute>
              <Layout><ExpenseReport /></Layout>
            </PrivateRoute>
          } />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
