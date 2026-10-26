import { Activity, ArrowUpRight, CalendarCheck, CircleDollarSign, Users, Weight } from 'lucide-react'

const stats = [
  { label: 'Tổng hội viên', value: '248', change: '+12 tháng này', icon: Users, color: 'violet' },
  { label: 'Đang hoạt động', value: '196', change: '79% tổng hội viên', icon: Activity, color: 'green' },
  { label: 'Buổi tập tuần này', value: '384', change: '+8.4% tuần trước', icon: CalendarCheck, color: 'orange' },
  { label: 'Gói sắp hết hạn', value: '17', change: 'Cần theo dõi', icon: CircleDollarSign, color: 'blue' },
]
const sessions = [
  { name: 'Nguyễn Minh Anh', type: 'Personal Training', trainer: 'Trần Quốc Bảo', time: '08:00 – 09:00', state: 'Đã xác nhận', color: 'green' },
  { name: 'Lê Hoàng Nam', type: 'Strength Training', trainer: 'Phạm Thu Hà', time: '09:30 – 10:30', state: 'Đang chờ', color: 'orange' },
  { name: 'Trần Khánh Linh', type: 'Cardio & Core', trainer: 'Trần Quốc Bảo', time: '10:45 – 11:30', state: 'Đã xác nhận', color: 'green' },
  { name: 'Phạm Đức Long', type: 'Full Body', trainer: 'Nguyễn Hải Đăng', time: '13:00 – 14:00', state: 'Đã xác nhận', color: 'green' },
]
const bars = [42, 58, 49, 76, 61, 89, 70, 54, 83, 66, 96, 74]

export default function Dashboard() {
  return (
    <>
      <div className="page-heading"><div><div className="eyebrow">MONDAY, YOUR NEXT LEVEL</div><h1>Tổng quan</h1><p>Chào mừng trở lại! Đây là tình hình hoạt động phòng gym của bạn.</p></div><button className="button button-primary" onClick={() => window.location.assign('/members')}>+ Thêm hội viên</button></div>
      <section className="stats-grid">
        {stats.map(({ label, value, change, icon: Icon, color }) => <article className="stat-card" key={label}><div className="stat-top"><span>{label}</span><span className={`stat-icon ${color}`}><Icon size={19} /></span></div><div className="stat-value">{value}</div><div className="stat-change"><ArrowUpRight size={15} /> {change}</div></article>)}
      </section>
      <section className="dashboard-grid">
        <article className="panel activity-panel">
          <div className="panel-heading"><div><h2>Hoạt động tập luyện</h2><p>Số buổi tập trong 12 tháng gần nhất</p></div><span className="pill pill-neutral">Năm nay</span></div>
          <div className="chart-area"><div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="bar-chart">{bars.map((height, i) => <div className="bar-column" key={i}><div className="bar" style={{ height: `${height}%` }} /><span>{['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'][i]}</span></div>)}</div></div>
        </article>
        <article className="panel goal-panel"><div className="panel-heading"><div><h2>Mục tiêu tuần</h2><p>Tiến độ hoạt động</p></div><Weight size={20} className="muted-icon" /></div><div className="goal-ring"><div className="ring-inner"><strong>76%</strong><span>Hoàn thành</span></div></div><div className="goal-caption"><strong>38 / 50 buổi tập</strong><span>Thêm 12 buổi để đạt mục tiêu</span></div><div className="progress-track"><div style={{ width: '76%' }} /></div></article>
      </section>
      <section className="panel sessions-panel"><div className="panel-heading"><div><h2>Lịch tập hôm nay</h2><p>Các buổi tập sắp diễn ra tại phòng gym</p></div><a className="text-link" href="/workouts">Xem lịch tập <ArrowUpRight size={15} /></a></div><div className="table-wrap"><table><thead><tr><th>HỘI VIÊN</th><th>BUỔI TẬP</th><th>HUẤN LUYỆN VIÊN</th><th>THỜI GIAN</th><th>TRẠNG THÁI</th></tr></thead><tbody>{sessions.map((s) => <tr key={s.name}><td><div className="person-cell"><div className="person-avatar">{s.name.split(' ').slice(-2).map(x => x[0]).join('')}</div><strong>{s.name}</strong></div></td><td>{s.type}</td><td>{s.trainer}</td><td className="time-cell">{s.time}</td><td><span className={`pill pill-${s.color}`}>{s.state}</span></td></tr>)}</tbody></table></div></section>
      <p className="demo-note"><span /> Giao diện hiện đang sử dụng dữ liệu mẫu cho dashboard. Hãy kết nối API báo cáo để hiển thị dữ liệu thật.</p>
    </>
  )
}
