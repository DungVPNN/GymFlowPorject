import { useEffect, useState } from 'react'
import { Search, UserPlus, RefreshCw } from 'lucide-react'
import { listMembers, createMember } from '../services/members'

export default function Members() {
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' })

  async function loadMembers(query = '') {
    setLoading(true); setError('')
    try { setMembers(await listMembers(query)) }
    catch { setError('Không tải được danh sách. Hãy kiểm tra backend và cấu hình database.') }
    finally { setLoading(false) }
  }
  useEffect(() => { loadMembers() }, [])

  async function submit(event) {
    event.preventDefault(); setError('')
    try {
      await createMember(form)
      setForm({ fullName: '', email: '', phone: '' }); setShowForm(false); await loadMembers(search)
    } catch (e) { setError(e?.response?.data?.message || 'Không thể tạo hội viên.') }
  }

  return (
    <>
      <div className="page-heading"><div><div className="eyebrow">MEMBER MANAGEMENT</div><h1>Hội viên</h1><p>Quản lý hồ sơ và trạng thái hội viên phòng gym.</p></div><button className="button button-primary" onClick={() => setShowForm(!showForm)}><UserPlus size={17} /> Thêm hội viên</button></div>
      {showForm && <form className="panel member-form" onSubmit={submit}><h2>Thông tin hội viên</h2><div className="form-grid"><label>Họ và tên<input required maxLength="120" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} placeholder="Nguyễn Văn A" /></label><label>Email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" /></label><label>Số điện thoại<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="09xxxxxxxx" /></label></div><div className="form-actions"><button className="button button-primary" type="submit">Lưu hội viên</button><button className="button button-ghost" type="button" onClick={() => setShowForm(false)}>Hủy</button></div></form>}
      <section className="panel members-panel"><div className="members-toolbar"><div className="search-box"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && loadMembers(search)} placeholder="Tìm theo tên hoặc email..." /></div><button className="button button-ghost" onClick={() => loadMembers(search)}><RefreshCw size={16} /> Tìm kiếm</button></div>
        {error && <div className="error-banner">{error}</div>}
        {loading ? <div className="empty-state">Đang tải dữ liệu...</div> : members.length === 0 ? <div className="empty-state">Chưa có hội viên. Hãy thêm hội viên đầu tiên.</div> : <div className="table-wrap"><table><thead><tr><th>HỘI VIÊN</th><th>EMAIL</th><th>SỐ ĐIỆN THOẠI</th><th>TRẠNG THÁI</th></tr></thead><tbody>{members.map(m => <tr key={m.id}><td><div className="person-cell"><div className="person-avatar">{m.fullName?.split(' ').slice(-2).map(x => x[0]).join('')}</div><strong>{m.fullName}</strong></div></td><td>{m.email}</td><td>{m.phone || '—'}</td><td><span className={`pill ${m.status === 'ACTIVE' ? 'pill-green' : 'pill-neutral'}`}>{m.status === 'ACTIVE' ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span></td></tr>)}</tbody></table></div>}
      </section>
      <p className="demo-note"><span /> Danh sách hội viên được lấy từ backend GymFlow.</p>
    </>
  )
}
