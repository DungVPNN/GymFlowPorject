import { CalendarDays, Clock3, Dumbbell, UserRound } from 'lucide-react'

const sample = [
  { time: '07:00 – 08:00', name: 'Strength Fundamentals', member: 'Nguyễn Minh Anh', trainer: 'Trần Quốc Bảo', type: 'Sức mạnh', status: 'Đã xác nhận' },
  { time: '08:30 – 09:15', name: 'Cardio & Core', member: 'Lê Hoàng Nam', trainer: 'Phạm Thu Hà', type: 'Cardio', status: 'Đã xác nhận' },
  { time: '10:00 – 11:00', name: 'Full Body Workout', member: 'Trần Khánh Linh', trainer: 'Nguyễn Hải Đăng', type: 'Toàn thân', status: 'Đang chờ' },
  { time: '14:00 – 15:00', name: 'Lower Body Strength', member: 'Phạm Đức Long', trainer: 'Trần Quốc Bảo', type: 'Sức mạnh', status: 'Đã xác nhận' },
]
export default function Workouts() {
  return <><div className="page-heading"><div><div className="eyebrow">TRAINING SCHEDULE</div><h1>Lịch & buổi tập</h1><p>Theo dõi lịch tập và các buổi huấn luyện trong ngày.</p></div><div className="date-chip"><CalendarDays size={17} /> Lịch mẫu</div></div><div className="notice-banner"><Dumbbell size={20} /><div><strong>Lịch tập mẫu</strong><span>Đây là dữ liệu minh họa. API lịch tập sẽ được bổ sung trong các sprint tiếp theo.</span></div></div><section className="schedule-list">{sample.map((s, i) => <article className="panel schedule-card" key={s.name}><div className="schedule-time"><Clock3 size={17} /><strong>{s.time}</strong></div><div className="schedule-info"><h3>{s.name}</h3><div className="schedule-meta"><span><UserRound size={14} /> {s.member}</span><span>HLV: {s.trainer}</span></div></div><div className="schedule-end"><span className="pill pill-neutral">{s.type}</span><span className={`pill ${s.status === 'Đã xác nhận' ? 'pill-green' : 'pill-orange'}`}>{s.status}</span></div></article>)}</section></>
}
