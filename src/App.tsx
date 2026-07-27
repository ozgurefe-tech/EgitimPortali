import { useState } from 'react'
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
  { label: 'Yardım', icon: CircleHelp },
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

  const save = () => { setNotice(true); setTimeout(() => setNotice(false), 2500) }

  return <div className="app-shell">
    <aside className={`sidebar ${open ? 'show' : ''}`}>
      <div className="brand"><div className="brand-mark">K</div><div><strong>ODTÜ KALTEV</strong><span>Yönetim Paneli</span></div><button className="mobile-close" onClick={() => setOpen(false)}><X size={18}/></button></div>
      <nav>
        <p className="nav-caption">YÖNETİM</p>
        {menu.map(({ label, icon: Icon, count }) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => { setActive(label); setOpen(false) }}>
          <Icon size={19}/><span>{label}</span>{count && <em>{count}</em>}
        </button>)}
      </nav>
      <div className="sidebar-bottom"><button className="nav-item"><Settings size={19}/><span>Ayarlar</span></button><div className="profile"><div className="avatar purple">ZE</div><div><strong>Zeynep Erdem</strong><span>Yönetici</span></div><ChevronDown size={16}/></div></div>
    </aside>
    {open && <div className="scrim" onClick={() => setOpen(false)} />}

    <main>
      <header><button className="menu-btn" onClick={() => setOpen(true)}><Menu/></button><div className="crumb"><span>Yönetim Paneli</span><ChevronRight size={15}/><b>{active}</b></div><div className="header-actions"><label className="search"><Search size={18}/><input placeholder="Ara..." value={query} onChange={e => setQuery(e.target.value)}/></label><div className="dropdown-wrap"><button className="icon-btn" aria-label="Bildirimler" onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false) }}><Bell size={20}/><i/></button>{notificationsOpen && <div className="dropdown notifications"><div className="drop-head"><strong>Bildirimler</strong><button onClick={() => setNotificationsOpen(false)}>Tümünü okundu say</button></div><div className="notification"><span className="dot red"/><div><strong>8 yeni başvuru</strong><p>İncelemenizi bekleyen başvurular var.</p><time>42 dakika önce</time></div></div><div className="notification"><span className="dot blue"/><div><strong>Etkinlik yaklaşıyor</strong><p>Kariyer Buluşmaları yarın başlıyor.</p><time>2 saat önce</time></div></div><a className="all-notifications">Tüm bildirimleri gör</a></div>}</div><div className="dropdown-wrap"><button className="profile-button" aria-label="Profil menüsü" onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false) }}><div className="avatar purple small">ZE</div><ChevronDown size={15}/></button>{profileOpen && <div className="dropdown profile-dropdown"><div className="profile-summary"><div className="avatar purple">ZE</div><div><strong>Zeynep Erdem</strong><span>yonetici@odtukaltev.org</span></div></div><button><Settings size={16}/> Hesap ayarları</button><button><CircleHelp size={16}/> Yardım merkezi</button><hr/><button className="signout">Çıkış yap</button></div>}</div></div></header>
      <section className="content">
        {active !== 'Ana Sayfa' ? <ContentPage active={active} /> : <>
        <div className="welcome"><div><p className="eyebrow">27 TEMMUZ 2026, PAZARTESİ</p><h1>Günaydın, Zeynep <span>✦</span></h1><p>ODTÜ KALTEV içeriklerine hızlıca göz atın.</p></div><button className="primary" onClick={() => setActive('Eğitimler')}><Plus size={18}/> Yeni içerik ekle</button></div>
        <div className="stats">
          <article><div className="stat-icon bordeaux"><GraduationCap size={22}/></div><div><span>Aktif eğitim</span><strong>12</strong><small className="up">↑ %8 bu ay</small></div><MoreHorizontal size={19}/></article>
          <article><div className="stat-icon blue"><FileText size={22}/></div><div><span>Yeni başvuru</span><strong>48</strong><small className="up">↑ %12 bu hafta</small></div><MoreHorizontal size={19}/></article>
          <article><div className="stat-icon yellow"><CalendarDays size={22}/></div><div><span>Yaklaşan etkinlik</span><strong>4</strong><small>Önümüzdeki 30 gün</small></div><MoreHorizontal size={19}/></article>
          <article><div className="stat-icon green"><MessageSquareText size={22}/></div><div><span>Bekleyen yorum</span><strong>3</strong><small className="alert">İnceleme bekliyor</small></div><MoreHorizontal size={19}/></article>
        </div>
        <div className="dashboard-grid">
          <section className="panel activity"><div className="panel-head"><div><h2>Son aktiviteler</h2><p>Panelde gerçekleşen son işlemler</p></div><button className="link-btn">Tümünü görüntüle <ChevronRight size={16}/></button></div><div className="activity-list">{activities.map(([title, subject, time, initials], i) => <div className="activity-row" key={title}><div className={`avatar ${['blue','yellow','bordeaux','green'][i]}`}>{initials}</div><div><strong>{title}</strong><p>{subject}</p></div><time>{time}</time><button><MoreHorizontal size={19}/></button></div>)}</div></section>
          <section className="panel quick"><div className="panel-head"><div><h2>Hızlı işlemler</h2><p>Sık kullandığınız işlemler</p></div></div><div className="quick-list"><button onClick={() => setActive('Eğitimler')}><span className="mini-icon bordeaux"><Plus size={17}/></span><div><strong>Yeni eğitim oluştur</strong><p>Eğitim programı ekleyin</p></div><ChevronRight size={18}/></button><button onClick={() => setActive('Etkinliklerimiz')}><span className="mini-icon blue"><CalendarDays size={17}/></span><div><strong>Etkinlik planla</strong><p>Takvime yeni etkinlik ekleyin</p></div><ChevronRight size={18}/></button><button onClick={() => setActive('Başvuru')}><span className="mini-icon yellow"><FileText size={17}/></span><div><strong>Başvuruları incele</strong><p>8 yeni başvuru bekliyor</p></div><ChevronRight size={18}/></button></div></section>
        </div>
        <section className="panel announcement"><div className="panel-head"><div><h2>Site duyurusu</h2><p>Ana sayfada gösterilecek metni yönetin</p></div><label className="toggle"><input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)}/><span/></label></div><div className="announce-body"><div><label>DUYURU BAŞLIĞI</label><input defaultValue="2026 Güz Dönemi Başvuruları Başladı"/><label>DUYURU METNİ</label><textarea defaultValue="ODTÜ KALTEV eğitim programlarına başvurularınızı şimdi tamamlayabilirsiniz."/></div><div className="preview"><p>WEB SİTESİ ÖNİZLEME</p><div className="preview-card"><span>{published ? 'GÜNCEL DUYURU' : 'TASLAK'}</span><h3>2026 Güz Dönemi Başvuruları Başladı</h3><p>ODTÜ KALTEV eğitim programlarına başvurularınızı şimdi tamamlayabilirsiniz.</p><a>Detayları incele <ChevronRight size={14}/></a></div></div></div><div className="panel-footer"><span>{notice ? '✓ Değişiklikler kaydedildi' : 'Son düzenleme: bugün, 10:24'}</span><button className="secondary">Önizle</button><button className="primary" onClick={save}>Değişiklikleri kaydet</button></div></section>
        </>}
      </section>
    </main>
  </div>
}

function ContentPage({ active }: { active: string }) {
  const labels: Record<string, string[]> = {
    'Hakkında': ['Kurum hakkında', 'Misyon ve vizyon', 'Yönetim kurulu'],
    'Eğitimler': ['Web Tasarımı Eğitimi', 'Yazılım Geliştirme', 'Proje Yönetimi'],
    'Etkinliklerimiz': ['Kariyer Buluşmaları', 'Mezunlar Günü', 'Tanışma Toplantısı'],
    'Kişiler': ['Prof. Dr. Ahmet Yılmaz', 'Zeynep Erdem', 'Selin Yalçın'],
    'Ofisler': ['Ankara Merkez Ofis', 'İstanbul Ofis'],
    'Başvuru': ['Ece Kaya — Yeni', 'Mehmet Demir — İnceleniyor', 'Ali Can — Onaylandı'],
    'Yorumlar': ['Eğitim çok verimliydi.', 'Eğitmenler harikaydı.', 'Yeni dönem ne zaman?'],
    'Yardım': ['Başvuru nasıl yapılır?', 'Eğitim takvimi', 'İletişim desteği'],
    'İletişim': ['info@odtukaltev.org', '+90 312 210 00 00', 'Ankara, Türkiye'],
  }
  const items = labels[active] ?? []
  return <section className="content-page">
    <div className="page-heading"><div><p className="eyebrow">İÇERİK YÖNETİMİ</p><h2>{active}</h2><p>Bu bölümdeki içerikleri görüntüleyin ve düzenleyin.</p></div><button className="primary"><Plus size={17}/> Yeni içerik</button></div>
    <div className="panel content-list"><div className="list-toolbar"><strong>Tüm içerikler</strong><label className="search"><Search size={17}/><input placeholder="İçerik ara..."/></label></div>{items.map((item, index) => <div className="content-row" key={item}><span className="row-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{item}</strong><p>Son güncelleme: bugün</p></div><span className="published">Yayında</span><button className="edit-button"><Pencil size={15}/> Düzenle</button></div>)}</div>
  </section>
}

export default App
