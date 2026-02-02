import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import TopBar from '../components/TopBar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-dark-900 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
