import { useEffect, useState } from 'react'
import type { ElementType } from 'react'
import {
  Bell, CalendarDays, ChevronDown, ChevronRight, CircleHelp, FileText,
  GraduationCap, LayoutDashboard, MapPin, Menu, MessageSquareText, MoreHorizontal,
  Pencil, Plus, Search, Settings, Users, X
} from 'lucide-react'

type MenuItem = { label: string; icon: ElementType; count?: string }

const menu: MenuItem[] = [
  { label: 'Ana Sayfa', icon: LayoutDashboard },
  { label: 'Hakkında', icon: FileText },
  { label: 'Eğitimler', icon: GraduationCap, count: '12' },
  { label: 'Etkinliklerimiz', icon: CalendarDays, count: '4' },
  { label: 'Kişiler', icon: Users },
  { label: 'Ofisler', icon: MapPin },
  { label: 'Başvuru', icon: FileText, count: '8' },
  { label: 'Yorumlar', icon: MessageSquareText, count: '3' },
  { label: 'İletişim', icon: MessageSquareText },
]

const activities = [
  ['Duyuru güncellendi', 'Ana Sayfa', '10 dakika önce', 'DU'],
  ['Yeni başvuru alındı', 'Yazılım Geliştirme', '42 dakika önce', 'EK'],
  ['Etkinlik yayınlandı', 'Kariyer Buluşmaları', '2 saat önce', 'SY'],
  ['Yeni yorum onaylandı', 'Web Tasarımı Eğitimi', '3 saat önce', 'AY'],
]

function App() {
  const [active, setActive] = useState('Ana Sayfa')
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState(false)
  const [query, setQuery] = useState('')
  const [published, setPublished] = useState(true)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [sideProfileOpen, setSideProfileOpen] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)

  const save = () => { setNotice(true); setTimeout(() => setNotice(false), 2500) }

  return <div className="app-shell">
    <aside className={`sidebar ${open ? 'show' : ''}`}>
      <div className="brand"><div className="brand-mark">K</div><div><strong>ODTÜ KALTEV</strong><span>Yönetim Paneli</span></div><button className="mobile-close" onClick={() => setOpen(false)}><X size={18}/></button></div>
      <nav>
        <p className="nav-caption">YÖNETİM</p>
        {menu.map(({ label, icon: Icon, count }) => label === 'Etkinliklerimiz' ? <div key={label} className="nav-group"><button className={`nav-item ${active.includes('Etkinlik') ? 'active' : ''}`} onClick={() => setEventsOpen(!eventsOpen)}><Icon size={19}/><span>{label}</span>{count && <em>{count}</em>}<ChevronDown className={`sub-arrow ${eventsOpen ? 'open' : ''}`} size={15}/></button>{eventsOpen && <div className="sub-nav"><button className={active === 'Planlanan Etkinlikler' ? 'active' : ''} onClick={() => { setActive('Planlanan Etkinlikler'); setOpen(false) }}>Planlanan Etkinlikler</button><button className={active === 'Geçmiş Etkinlikler' ? 'active' : ''} onClick={() => { setActive('Geçmiş Etkinlikler'); setOpen(false) }}>Geçmiş Etkinlikler</button></div>}</div> : <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => { setActive(label); setOpen(false) }}>
          <Icon size={19}/><span>{label}</span>{count && <em>{count}</em>}
        </button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="settings-links">
          <button className="nav-item" onClick={() => { setActive('Genel Ayarlar'); setOpen(false) }}><Settings size={19}/><span>Genel Ayarlar</span></button>
          <button className="nav-item" onClick={() => { setActive('Hesap Ayarları'); setOpen(false) }}><Users size={18}/><span>Hesap Ayarları</span></button>
        </div>
        <div className="side-profile-wrap"><button className="profile side-profile" onClick={() => setSideProfileOpen(!sideProfileOpen)}><div className="avatar purple">ÖE</div><div><strong>Özgür Efe</strong><span>Yönetici</span></div><ChevronDown size={16}/></button>{sideProfileOpen && <div className="side-profile-menu"><strong>Özgür Efe</strong><span>yonetici@odtukaltev.org</span><button onClick={() => setActive('Hesap Ayarları')}><Settings size={15}/> Hesap ayarları</button><button onClick={() => setActive('Yardım')}><CircleHelp size={15}/> Yardım merkezi</button></div>}</div>
      </div>
    </aside>
    {open && <div className="scrim" onClick={() => setOpen(false)} />}

    <main>
      <header><button className="menu-btn" onClick={() => setOpen(true)}><Menu/></button><div className="crumb"><span>Yönetim Paneli</span><ChevronRight size={15}/><b>{active}</b></div><div className="header-actions"><label className="search"><Search size={18}/><input placeholder="Ara..." value={query} onChange={e => setQuery(e.target.value)}/></label><div className="dropdown-wrap"><button className="icon-btn" aria-label="Bildirimler" onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false) }}><Bell size={20}/><i/></button>{notificationsOpen && <div className="dropdown notifications"><div className="drop-head"><strong>Bildirimler</strong><button onClick={() => setNotificationsOpen(false)}>Tümünü okundu say</button></div><div className="notification"><span className="dot red"/><div><strong>8 yeni başvuru</strong><p>İncelemenizi bekleyen başvurular var.</p><time>42 dakika önce</time></div></div><div className="notification"><span className="dot blue"/><div><strong>Etkinlik yaklaşıyor</strong><p>Kariyer Buluşmaları yarın başlıyor.</p><time>2 saat önce</time></div></div><a className="all-notifications">Tüm bildirimleri gör</a></div>}</div><div className="dropdown-wrap"><button className="profile-button" aria-label="Profil menüsü" onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false) }}><div className="avatar purple small">ÖE</div><ChevronDown size={15}/></button>{profileOpen && <div className="dropdown profile-dropdown"><div className="profile-summary"><div className="avatar purple">ÖE</div><div><strong>Özgür Efe</strong><span>yonetici@odtukaltev.org</span></div></div><button onClick={() => setActive('Ayarlar')}><Settings size={16}/> Hesap ayarları</button><button onClick={() => setActive('Yardım')}><CircleHelp size={16}/> Yardım merkezi</button><hr/><button className="signout">Çıkış yap</button></div>}</div></div></header>
      <section className="content">
        {active !== 'Ana Sayfa' ? <ContentPage active={active} /> : <>
        <div className="welcome"><div><p className="eyebrow">27 TEMMUZ 2026, PAZARTESİ</p><h1>Günaydın, Özgür <span>✦</span></h1><p>ODTÜ KALTEV içeriklerine hızlıca göz atın.</p></div><button className="primary" onClick={() => setActive('Eğitimler')}><Plus size={18}/> Yeni içerik ekle</button></div>
        <div className="stats">
          <article><div className="stat-icon bordeaux"><GraduationCap size={22}/></div><div><span>Aktif eğitim</span><strong>12</strong><small className="up">↑ %8 bu ay</small></div><MoreHorizontal size={19}/></article>
          <article><div className="stat-icon blue"><FileText size={22}/></div><div><span>Yeni başvuru</span><strong>48</strong><small className="up">↑ %12 bu hafta</small></div><MoreHorizontal size={19}/></article>
          <article><div className="stat-icon yellow"><CalendarDays size={22}/></div><div><span>Yaklaşan etkinlik</span><strong>4</strong><small>Önümüzdeki 30 gün</small></div><MoreHorizontal size={19}/></article>
          <article><div className="stat-icon green"><MessageSquareText size={22}/></div><div><span>Bekleyen yorum</span><strong>3</strong><small className="alert">İnceleme bekliyor</small></div><MoreHorizontal size={19}/></article>
        </div>
        <div className="dashboard-grid">
          <section className="panel activity"><div className="panel-head"><div><h2>Son aktiviteler</h2><p>Panelde gerçekleşen son işlemler</p></div><button className="link-btn">Tümünü görüntüle <ChevronRight size={16}/></button></div><div className="activity-list">{activities.map(([title, subject, time, initials], i) => <div className="activity-row" key={title}><div className={`avatar ${['blue','yellow','bordeaux','green'][i]}`}>{initials}</div><div><strong>{title}</strong><p>{subject}</p></div><time>{time}</time><button><MoreHorizontal size={19}/></button></div>)}</div></section>
          <section className="panel quick"><div className="panel-head"><div><h2>Hızlı işlemler</h2><p>Sık kullandığınız işlemler</p></div></div><div className="quick-list"><button onClick={() => setActive('Eğitimler')}><span className="mini-icon bordeaux"><Plus size={17}/></span><div><strong>Yeni eğitim oluştur</strong><p>Eğitim programı ekleyin</p></div><ChevronRight size={18}/></button><button onClick={() => { setActive('Planlanan Etkinlikler'); setEventsOpen(true) }}><span className="mini-icon blue"><CalendarDays size={17}/></span><div><strong>Etkinlik planla</strong><p>Takvime yeni etkinlik ekleyin</p></div><ChevronRight size={18}/></button><button onClick={() => setActive('Başvuru')}><span className="mini-icon yellow"><FileText size={17}/></span><div><strong>Başvuruları incele</strong><p>8 yeni başvuru bekliyor</p></div><ChevronRight size={18}/></button></div></section>
        </div>
        <section className="panel announcement"><div className="panel-head"><div><h2>Site duyurusu</h2><p>Ana sayfada gösterilecek metni yönetin</p></div><label className="toggle"><input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)}/><span/></label></div><div className="announce-body"><div><label>DUYURU BAŞLIĞI</label><input defaultValue="2026 Güz Dönemi Başvuruları Başladı"/><label>DUYURU METNİ</label><textarea defaultValue="ODTÜ KALTEV eğitim programlarına başvurularınızı şimdi tamamlayabilirsiniz."/></div><div className="preview"><p>WEB SİTESİ ÖNİZLEME</p><div className="preview-card"><span>{published ? 'GÜNCEL DUYURU' : 'TASLAK'}</span><h3>2026 Güz Dönemi Başvuruları Başladı</h3><p>ODTÜ KALTEV eğitim programlarına başvurularınızı şimdi tamamlayabilirsiniz.</p><a>Detayları incele <ChevronRight size={14}/></a></div></div></div><div className="panel-footer"><span>{notice ? '✓ Değişiklikler kaydedildi' : 'Son düzenleme: bugün, 10:24'}</span><button className="secondary">Önizle</button><button className="primary" onClick={save}>Değişiklikleri kaydet</button></div></section>
        </>}
      </section>
    </main>
  </div>
}

type SettingItem = { key: string; label: string; value: string; type: string; updated_at: string }

type ApiItem = { id: number; title: string; detail?: string | null; status: string | number; updated_at: string }

type UserProfile = { id: number; full_name: string; email: string; role: string; is_active: boolean; updated_at: string; avatar_url?: string | null }

function ContentPage({ active }: { active: string }) {
  const labels: Record<string, string[]> = {
    'Hakkında': ['Kurum hakkında', 'Misyon ve vizyon', 'Yönetim kurulu'],
    'Eğitimler': ['Web Tasarımı Eğitimi', 'Yazılım Geliştirme', 'Proje Yönetimi'],
    'Planlanan Etkinlikler': ['Kariyer Buluşmaları', 'Mezunlar Günü', 'Tanışma Toplantısı'],
    'Geçmiş Etkinlikler': ['2026 Bahar Kariyer Günleri', 'Mezunlar Buluşması 2025', 'Teknoloji Zirvesi'],
    'Kişiler': ['Prof. Dr. Ahmet Yılmaz', 'Zeynep Erdem', 'Selin Yalçın'],
    'Ofisler': ['Ankara Merkez Ofis', 'İstanbul Ofis'],
    'Başvuru': ['Ece Kaya — Yeni', 'Mehmet Demir — İnceleniyor', 'Ali Can — Onaylandı'],
    'Yorumlar': ['Eğitim çok verimliydi.', 'Eğitmenler harikaydı.', 'Yeni dönem ne zaman?'],
    'Yardım': ['Başvuru nasıl yapılır?', 'Eğitim takvimi', 'İletişim desteği'],
    'İletişim': ['info@odtukaltev.org', '+90 312 210 00 00', 'Ankara, Türkiye'],
    'Hesap Ayarları': ['Profil bilgileri', 'Bildirim tercihleri', 'Güvenlik'],
    'Genel Ayarlar': ['Site başlığı', 'Dil', 'Tarih formatı'],
  }
  const [items, setItems] = useState<ApiItem[]>([])
  const [user, setUser] = useState<UserProfile | null>(null)
  const [settingsItems, setSettingsItems] = useState<SettingItem[]>([])
  const [settingsValues, setSettingsValues] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setApiError('')
    let url = `/api/content/${encodeURIComponent(active)}`
    if (active === 'Genel Ayarlar') url = '/api/settings'
    if (active === 'Hesap Ayarları') url = '/api/me'
    fetch(url, { signal: controller.signal, method: 'GET', headers: { 'Accept': 'application/json' } })
      .then(async (response) => {
        if (!response.ok) throw new Error('API isteği başarısız oldu')
        return response.json()
      })
      .then((data) => {
        if (active === 'Hesap Ayarları') {
          setUser(data.user || null)
          setItems([])
          setSettingsItems([])
        } else if (active === 'Genel Ayarlar') {
          const resolved = (data.items || data || []) as SettingItem[]
          const map: Record<string, any> = {}
          resolved.forEach((s) => { map[s.key] = s.value })
          setSettingsItems(resolved)
          setSettingsValues(map)
          setItems([])
          setUser(null)
        } else {
          const resolved = (data.items || data || []) as ApiItem[]
          setItems(resolved)
          setSettingsItems([])
          setUser(null)
        }
      })
      .catch((error) => { if (error.name !== 'AbortError') setApiError('Veriler alınamadı. API sunucusunun açık olduğunu kontrol edin.') })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [active])

  const fallbackItems = (labels[active] ?? []).map((title, index) => ({ id: index, title, detail: null, status: 'published', updated_at: '' }))
  const displayItems = apiError ? fallbackItems : items
  const displaySettings = apiError ? [] : settingsItems

  return <section className="content-page">
    <div className="page-heading"><div><p className="eyebrow">İÇERİK YÖNETİMİ</p><h2>{active}</h2><p>Bu bölümdeki içerikleri görüntüleyin ve düzenleyin.</p></div><button className="primary"><Plus size={17}/> Yeni içerik</button></div>
    <div className="panel content-list">
      <div className="list-toolbar"><strong>Tüm içerikler</strong><label className="search"><Search size={17}/><input placeholder="İçerik ara..."/></label></div>
      {loading && <p className="data-state">Veriler yükleniyor...</p>}
      {apiError && <p className="data-state error">{apiError} Geçici içerikler gösteriliyor.</p>}
      {!loading && active === 'Genel Ayarlar' && <div className="settings-list">
        {displaySettings.map((item) => <div className="setting-row" key={item.key}>
          <label>{item.label}</label>
          <input value={settingsValues[item.key] ?? item.value ?? ''} onChange={e => setSettingsValues({ ...settingsValues, [item.key]: e.target.value })} />
        </div>)}
        <div className="settings-actions"><button className="primary" onClick={async () => {
          try {
            for (const item of displaySettings) {
              const key = item.key
              const value = settingsValues[key] ?? item.value
              await fetch(`/api/settings/${encodeURIComponent(key)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })
            }
            alert('Genel ayarlar kaydedildi')
          } catch (err) { alert('Kaydetme hatası') }
        }}>Kaydet</button></div>
      </div>}
      {!loading && active === 'Hesap Ayarları' && user && <div className="profile-edit">
        <div className="field"><label>Ad Soyad</label><input id="profile-name" defaultValue={user.full_name} /></div>
        <div className="field"><label>E-posta</label><input id="profile-email" defaultValue={user.email} /></div>
        <div className="field"><label>Avatar URL</label><input id="profile-avatar" defaultValue={user.avatar_url || ''} /></div>
        <button className="primary" onClick={async () => {
          const full_name = (document.getElementById('profile-name') as HTMLInputElement).value
          const email = (document.getElementById('profile-email') as HTMLInputElement).value
          const avatar_url = (document.getElementById('profile-avatar') as HTMLInputElement).value
          const res = await fetch('/api/me', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ full_name, email, avatar_url }) })
          if (res.ok) alert('Profil güncellendi.')
          else alert('Güncelleme başarısız.')
        }}>Kaydet</button>
        <hr />
        <div className="password-change"><h4>Şifre değiştir</h4><div className="field"><label>Mevcut şifre</label><input type="password" id="current-password" /></div><div className="field"><label>Yeni şifre</label><input type="password" id="new-password" /></div><div className="field"><label>Yeni şifre (tekrar)</label><input type="password" id="confirm-password" /></div><button className="secondary" onClick={async () => {
          const current_password = (document.getElementById('current-password') as HTMLInputElement).value
          const new_password = (document.getElementById('new-password') as HTMLInputElement).value
          const confirm = (document.getElementById('confirm-password') as HTMLInputElement).value
          if (new_password !== confirm) { alert('Yeni şifre eşleşmiyor'); return }
          if (new_password.length < 8) { alert('Yeni şifre en az 8 karakter olmalı'); return }
          const res = await fetch('/api/me/password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ current_password, new_password }) })
          if (res.ok) alert('Şifre güncellendi')
          else { const j = await res.json().catch(()=>({})); alert('Hata: ' + (j.error || res.statusText)) }
        }}>Şifreyi Değiştir</button></div>
        <p className="hint">Profil ve şifre değişiklikleri burada yapılır.</p>
      </div>}
      {!loading && active !== 'Genel Ayarlar' && active !== 'Hesap Ayarları' && displayItems.map((item, index) => <div className="content-row" key={item.id}><span className="row-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{item.title}</strong><p>{item.detail || 'Son güncelleme: bugün'}</p></div><span className={`published ${String(item.status) === '0' ? 'muted' : ''}`}>{String(item.status) === 'published' || String(item.status) === '1' ? 'Yayında' : item.status}</span><button className="edit-button"><Pencil size={15}/> Düzenle</button></div>)}
    </div>
  </section>
}

export default App
