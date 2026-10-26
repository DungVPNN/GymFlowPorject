import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Activity, BarChart3, CalendarDays, Dumbbell, HeartPulse, LayoutDashboard, Menu, Users, Weight, X } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Workouts from './pages/Workouts'
import Progress from './pages/Progress'

const navItems = [
  { to: '/', label: 'Tổng quan', icon: LayoutDashboard, end: true },
  { to: '/members', label: 'Hội viên', icon: Users },
  { to: '/workouts', label: 'Lịch & buổi tập', icon: CalendarDays },
  { to: '/progress', label: 'Tiến độ tập luyện', icon: BarChart3 },
]

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [apiStatus, setApiStatus] = useState('Đang kết nối API')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/hello`)
      .then((res) => {
        if (!res.ok) throw new Error('API chưa sẵn sàng')
        return res.json()
      })
      .then(() => setApiStatus('API đang hoạt động'))
      .catch(() => setApiStatus('Chưa kết nối API'))
  }, [])

  const Sidebar = () => (
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand">
        <div className="brand-icon"><Dumbbell size={23} /></div>
        <div><strong>GymFlow</strong><span>FITNESS MANAGEMENT</span></div>
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Đóng menu"><X size={20} /></button>
      </div>
      <div className="nav-label">WORKSPACE</div>
      <nav className="nav-list">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Icon size={18} /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="coach-card"><div className="coach-icon"><HeartPulse size={19} /></div><div><strong>Keep moving</strong><span>Mỗi ngày tốt hơn 1%.</span></div></div>
        <div className="sidebar-foot">GYMFLOW MVP · 0.1.0</div>
      </div>
    </aside>
  )

  return (
    <div className="app-shell">
      <Sidebar />
      {mobileOpen && <button className="mobile-backdrop" onClick={() => setMobileOpen(false)} aria-label="Đóng menu" />}
      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Mở menu"><Menu size={21} /></button>
          <div className="breadcrumb">Workspace <span>/</span> <strong>Gym Management</strong></div>
          <div className="topbar-right"><span className={`status-dot ${apiStatus === 'API đang hoạt động' ? 'online' : ''}`} /> <span className="api-status">{apiStatus}</span><div className="avatar">GF</div></div>
        </header>
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
