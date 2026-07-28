-- ODTÜ KALTEV örnek veri paketi (MySQL 8.0+)
-- Önce schema.sql dosyasını çalıştırın, ardından bu dosyayı yükleyin.

USE odtu_kaltev;

-- schema.sql içindeki ilk yöneticiyle beraber toplam 10 kullanıcı olur.
INSERT INTO users (full_name, email, password_hash, role, is_active) VALUES
('Ayşe Yılmaz', 'ayse.yilmaz@odtukaltev.org', '$2b$12$examplehash0000000000000000000000000000000000000000000001', 'editor', TRUE),
('Mehmet Demir', 'mehmet.demir@odtukaltev.org', '$2b$12$examplehash0000000000000000000000000000000000000000000002', 'editor', TRUE),
('Selin Yalçın', 'selin.yalcin@odtukaltev.org', '$2b$12$examplehash0000000000000000000000000000000000000000000003', 'viewer', TRUE),
('Ahmet Kaya', 'ahmet.kaya@odtukaltev.org', '$2b$12$examplehash0000000000000000000000000000000000000000000004', 'editor', TRUE),
('Elif Arslan', 'elif.arslan@odtukaltev.org', '$2b$12$examplehash0000000000000000000000000000000000000000000005', 'viewer', TRUE),
('Can Özkan', 'can.ozkan@odtukaltev.org', '$2b$12$examplehash0000000000000000000000000000000000000000000006', 'editor', TRUE),
('Deniz Akın', 'deniz.akin@odtukaltev.org', '$2b$12$examplehash0000000000000000000000000000000000000000000007', 'viewer', TRUE),
('Burak Şahin', 'burak.sahin@odtukaltev.org', '$2b$12$examplehash0000000000000000000000000000000000000000000008', 'editor', TRUE),
('Derya Koç', 'derya.koc@odtukaltev.org', '$2b$12$examplehash0000000000000000000000000000000000000000000009', 'viewer', TRUE);

INSERT INTO pages (title, slug, content, page_type, status, published_at, updated_by) VALUES
('Ana Sayfa', 'ana-sayfa', 'ODTÜ KALTEV ana sayfa içeriği.', 'home', 'published', NOW(), 1),
('Hakkımızda', 'hakkimizda', 'Kurumumuz hakkında genel bilgiler.', 'about', 'published', NOW(), 2),
('Misyonumuz', 'misyonumuz', 'Nitelikli eğitim fırsatları sunmak.', 'about', 'published', NOW(), 3),
('Vizyonumuz', 'vizyonumuz', 'Eğitimde öncü bir kurum olmak.', 'about', 'published', NOW(), 4),
('Tarihçemiz', 'tarihcemiz', 'ODTÜ KALTEV tarihçesi.', 'about', 'draft', NULL, 5),
('İletişim Bilgileri', 'iletisim', 'Bize e-posta ve telefonla ulaşabilirsiniz.', 'contact', 'published', NOW(), 6),
('Sıkça Sorulan Sorular', 'sss', 'En sık sorulan soruların yanıtları.', 'help', 'published', NOW(), 7),
('Başvuru Rehberi', 'basvuru-rehberi', 'Başvuru adımları ve koşulları.', 'help', 'published', NOW(), 8),
('Gizlilik Politikası', 'gizlilik-politikasi', 'Kişisel verilerin korunmasına ilişkin metin.', 'help', 'published', NOW(), 9),
('Çerez Politikası', 'cerez-politikasi', 'Çerez kullanım politikası.', 'help', 'draft', NULL, 10);

INSERT INTO trainings (title, slug, summary, instructor_name, start_date, end_date, capacity, application_deadline, status, created_by) VALUES
('Web Tasarımı Eğitimi', 'web-tasarimi', 'Modern web arayüzleri tasarlama eğitimi.', 'Ayşe Yılmaz', '2026-09-05', '2026-10-10', 30, '2026-08-28', 'published', 2),
('Yazılım Geliştirme', 'yazilim-gelistirme', 'Başlangıçtan ileri seviyeye yazılım eğitimi.', 'Mehmet Demir', '2026-09-12', '2026-11-14', 25, '2026-09-01', 'published', 3),
('Proje Yönetimi', 'proje-yonetimi', 'Çevik proje yönetimi temelleri.', 'Ahmet Kaya', '2026-10-03', '2026-10-24', 20, '2026-09-20', 'published', 4),
('Veri Analitiği', 'veri-analitigi', 'Veri okuryazarlığı ve raporlama.', 'Elif Arslan', '2026-10-17', '2026-11-21', 24, '2026-10-05', 'published', 5),
('Python ile Programlama', 'python-programlama', 'Python programlama temelleri.', 'Can Özkan', '2026-11-07', '2026-12-12', 28, '2026-10-25', 'published', 6),
('Dijital Pazarlama', 'dijital-pazarlama', 'Dijital kanallarda marka yönetimi.', 'Deniz Akın', '2026-11-14', '2026-12-05', 22, '2026-11-01', 'draft', 7),
('Yapay Zekâya Giriş', 'yapay-zeka-giris', 'Yapay zekâ kavramları ve uygulamaları.', 'Burak Şahin', '2026-12-05', '2027-01-09', 30, '2026-11-20', 'published', 8),
('Etkili İletişim', 'etkili-iletisim', 'İletişim ve sunum teknikleri.', 'Derya Koç', '2026-09-19', '2026-10-03', 20, '2026-09-10', 'archived', 9),
('Grafik Tasarım', 'grafik-tasarim', 'Tasarım ilkeleri ve uygulamaları.', 'Selin Yalçın', '2026-10-24', '2026-11-28', 18, '2026-10-12', 'draft', 10),
('Girişimcilik', 'girisimcilik', 'İş fikrinden girişime yolculuk.', 'Özgür Efe', '2026-12-12', '2027-01-16', 25, '2026-11-30', 'published', 1);

INSERT INTO events (title, slug, description, location, start_at, end_at, status, created_by) VALUES
('Kariyer Buluşmaları', 'kariyer-bulusmalari-2026', 'Sektör temsilcileriyle kariyer buluşması.', 'ODTÜ Kültür Kongre Merkezi', '2026-09-18 10:00:00', '2026-09-18 17:00:00', 'published', 1),
('Mezunlar Günü', 'mezunlar-gunu-2026', 'Mezunlarımızla geleneksel buluşma.', 'ODTÜ Mezunlar Derneği', '2026-10-10 11:00:00', '2026-10-10 18:00:00', 'published', 2),
('Tanışma Toplantısı', 'tanisma-toplantisi-2026', 'Yeni dönem katılımcılarıyla tanışma.', 'Ankara Merkez Ofis', '2026-09-03 14:00:00', '2026-09-03 16:00:00', 'published', 3),
('Teknoloji Zirvesi', 'teknoloji-zirvesi-2026', 'Teknoloji trendleri etkinliği.', 'ODTÜ Teknokent', '2026-11-21 09:30:00', '2026-11-21 18:00:00', 'draft', 4),
('Eğitmenler Çalıştayı', 'egitmenler-calistayi-2026', 'Eğitmen gelişim çalıştayı.', 'İstanbul Ofis', '2026-12-03 10:00:00', '2026-12-03 16:00:00', 'published', 5),
('2026 Bahar Kariyer Günleri', 'bahar-kariyer-gunleri-2026', 'Geçmiş kariyer etkinliği.', 'ODTÜ Kültür Kongre Merkezi', '2026-04-15 10:00:00', '2026-04-16 17:00:00', 'published', 6),
('Mezunlar Buluşması 2025', 'mezunlar-bulusmasi-2025', 'Geçmiş mezun buluşması.', 'Ankara Merkez Ofis', '2025-11-12 12:00:00', '2025-11-12 18:00:00', 'published', 7),
('Teknoloji Zirvesi 2025', 'teknoloji-zirvesi-2025', 'Geçmiş teknoloji zirvesi.', 'ODTÜ Teknokent', '2025-10-08 09:00:00', '2025-10-08 17:00:00', 'published', 8),
('Kış Dönemi Açılışı', 'kis-donemi-acilisi-2026', 'Kış dönemi açılış etkinliği.', 'Ankara Merkez Ofis', '2026-12-19 13:00:00', '2026-12-19 16:00:00', 'draft', 9),
('Gönüllülük Günü', 'gonulluluk-gunu-2027', 'Toplumsal katkı etkinliği.', 'ODTÜ Kampüsü', '2027-01-23 10:00:00', '2027-01-23 15:00:00', 'published', 10);

INSERT INTO people (full_name, title, biography, email, phone, display_order, is_visible) VALUES
('Prof. Dr. Ahmet Yılmaz', 'Yönetim Kurulu Başkanı', 'Eğitim bilimleri alanında akademisyen.', 'ahmet.yilmaz@odtukaltev.org', '+90 312 210 00 01', 1, TRUE),
('Özgür Efe', 'Yönetici', 'ODTÜ KALTEV yönetim paneli yöneticisi.', 'yonetici@odtukaltev.org', '+90 312 210 00 02', 2, TRUE),
('Ayşe Yılmaz', 'Eğitim Koordinatörü', 'Eğitim programlarını koordine eder.', 'ayse.yilmaz@odtukaltev.org', '+90 312 210 00 03', 3, TRUE),
('Mehmet Demir', 'Yazılım Eğitmeni', 'Yazılım geliştirme eğitmeni.', 'mehmet.demir@odtukaltev.org', '+90 312 210 00 04', 4, TRUE),
('Selin Yalçın', 'Tasarım Eğitmeni', 'Görsel tasarım uzmanı.', 'selin.yalcin@odtukaltev.org', '+90 312 210 00 05', 5, TRUE),
('Ahmet Kaya', 'Proje Koordinatörü', 'Projeleri planlar ve takip eder.', 'ahmet.kaya@odtukaltev.org', '+90 312 210 00 06', 6, TRUE),
('Elif Arslan', 'Veri Analitiği Eğitmeni', 'Veri analizi ve raporlama uzmanı.', 'elif.arslan@odtukaltev.org', '+90 312 210 00 07', 7, TRUE),
('Can Özkan', 'Python Eğitmeni', 'Yazılım eğitmeni.', 'can.ozkan@odtukaltev.org', '+90 312 210 00 08', 8, TRUE),
('Deniz Akın', 'Dijital Pazarlama Eğitmeni', 'Dijital iletişim uzmanı.', 'deniz.akin@odtukaltev.org', '+90 312 210 00 09', 9, TRUE),
('Derya Koç', 'İletişim Eğitmeni', 'Etkili iletişim uzmanı.', 'derya.koc@odtukaltev.org', '+90 312 210 00 10', 10, TRUE);

INSERT INTO offices (name, address, city, phone, email, is_active) VALUES
('Ankara Merkez Ofis', 'Üniversiteler Mahallesi, Dumlupınar Bulvarı No:1', 'Ankara', '+90 312 210 00 00', 'ankara@odtukaltev.org', TRUE),
('İstanbul Ofis', 'Maslak Mahallesi, Büyükdere Caddesi No:100', 'İstanbul', '+90 212 300 00 01', 'istanbul@odtukaltev.org', TRUE),
('İzmir Ofis', 'Alsancak Mahallesi, Kıbrıs Şehitleri Caddesi No:40', 'İzmir', '+90 232 400 00 02', 'izmir@odtukaltev.org', TRUE),
('Bursa Ofis', 'Nilüfer Mahallesi, İzmir Yolu Caddesi No:80', 'Bursa', '+90 224 500 00 03', 'bursa@odtukaltev.org', TRUE),
('Antalya Ofis', 'Muratpaşa Mahallesi, Atatürk Caddesi No:55', 'Antalya', '+90 242 600 00 04', 'antalya@odtukaltev.org', TRUE),
('Eskişehir Ofis', 'Tepebaşı Mahallesi, İsmet İnönü Caddesi No:70', 'Eskişehir', '+90 222 700 00 05', 'eskisehir@odtukaltev.org', TRUE),
('Konya Ofis', 'Selçuklu Mahallesi, Yeni İstanbul Caddesi No:23', 'Konya', '+90 332 800 00 06', 'konya@odtukaltev.org', TRUE),
('Adana Ofis', 'Seyhan Mahallesi, Ziyapaşa Bulvarı No:91', 'Adana', '+90 322 900 00 07', 'adana@odtukaltev.org', FALSE),
('Samsun Ofis', 'İlkadım Mahallesi, Cumhuriyet Caddesi No:33', 'Samsun', '+90 362 200 00 08', 'samsun@odtukaltev.org', TRUE),
('Gaziantep Ofis', 'Şehitkamil Mahallesi, Üniversite Bulvarı No:45', 'Gaziantep', '+90 342 300 00 09', 'gaziantep@odtukaltev.org', TRUE);

INSERT INTO applications (training_id, full_name, email, phone, note, status, reviewed_by, reviewed_at) VALUES
(1, 'Ece Kaya', 'ece.kaya@example.com', '+90 533 111 00 01', 'Web tasarımına ilgi duyuyorum.', 'new', NULL, NULL),
(2, 'Mert Çelik', 'mert.celik@example.com', '+90 533 111 00 02', 'Yazılım alanında ilerlemek istiyorum.', 'reviewing', 2, NOW()),
(3, 'İrem Şen', 'irem.sen@example.com', '+90 533 111 00 03', 'Proje yönetimi deneyimimi geliştirmek istiyorum.', 'approved', 4, NOW()),
(4, 'Oğuzhan Acar', 'oguzhan.acar@example.com', '+90 533 111 00 04', 'Veri analitiği eğitimi için başvuruyorum.', 'new', NULL, NULL),
(5, 'Melis Eren', 'melis.eren@example.com', '+90 533 111 00 05', 'Python öğrenmek istiyorum.', 'approved', 6, NOW()),
(6, 'Kaan Koç', 'kaan.koc@example.com', '+90 533 111 00 06', 'Pazarlama alanında çalışıyorum.', 'rejected', 7, NOW()),
(7, 'Aslı Aydın', 'asli.aydin@example.com', '+90 533 111 00 07', 'Yapay zekâ alanına başlamak istiyorum.', 'reviewing', 8, NOW()),
(8, 'Emre Tunç', 'emre.tunc@example.com', '+90 533 111 00 08', 'Sunum becerilerimi geliştirmek istiyorum.', 'approved', 9, NOW()),
(9, 'Buse Kılıç', 'buse.kilic@example.com', '+90 533 111 00 09', 'Grafik tasarıma ilgim var.', 'new', NULL, NULL),
(10, 'Serkan Yıldız', 'serkan.yildiz@example.com', '+90 533 111 00 10', 'Girişimcilik fikrimi geliştirmek istiyorum.', 'new', NULL, NULL);

INSERT INTO comments (training_id, full_name, email, body, status, moderated_by, moderated_at) VALUES
(1, 'Ece Kaya', 'ece.kaya@example.com', 'Eğitim çok verimliydi.', 'approved', 1, NOW()),
(2, 'Mert Çelik', 'mert.celik@example.com', 'Eğitmen anlatımı çok anlaşılırdı.', 'approved', 2, NOW()),
(3, 'İrem Şen', 'irem.sen@example.com', 'Yeni dönem ne zaman başlayacak?', 'pending', NULL, NULL),
(4, 'Oğuzhan Acar', 'oguzhan.acar@example.com', 'İçerik oldukça kapsamlı görünüyor.', 'approved', 4, NOW()),
(5, 'Melis Eren', 'melis.eren@example.com', 'Python dersi için teşekkürler.', 'approved', 5, NOW()),
(6, 'Kaan Koç', 'kaan.koc@example.com', 'Eğitim süresi uzatılabilir mi?', 'pending', NULL, NULL),
(7, 'Aslı Aydın', 'asli.aydin@example.com', 'Yapay zekâ eğitimi çok ilgimi çekiyor.', 'approved', 7, NOW()),
(8, 'Emre Tunç', 'emre.tunc@example.com', 'Sunum teknikleri çok faydalıydı.', 'approved', 8, NOW()),
(9, 'Buse Kılıç', 'buse.kilic@example.com', 'Tasarım araçları da anlatılacak mı?', 'pending', NULL, NULL),
(10, 'Serkan Yıldız', 'serkan.yildiz@example.com', 'Girişimcilik eğitimi harikaydı.', 'rejected', 10, NOW());

INSERT INTO announcements (title, body, is_published, published_at, created_by) VALUES
('Kariyer Buluşmaları Yaklaşıyor', 'Sektör temsilcileriyle buluşmak için kaydınızı oluşturun.', TRUE, NOW(), 1),
('Yeni Eğitim Programları', 'Güz dönemi eğitim programları yayınlandı.', TRUE, NOW(), 2),
('Mezunlar Günü Kaydı', 'Mezunlar günü için kayıtlar açıldı.', TRUE, NOW(), 3),
('Ofis Çalışma Saatleri', 'Ofislerimiz hafta içi 09:00-18:00 arasında açıktır.', TRUE, NOW(), 4),
('Python Eğitimi Başvuruları', 'Python eğitimi başvuruları devam ediyor.', TRUE, NOW(), 5),
('Teknoloji Zirvesi', 'Teknoloji zirvesi programı yakında açıklanacak.', FALSE, NULL, 6),
('Kış Dönemi Takvimi', 'Kış dönemi eğitim takvimi yayınlandı.', TRUE, NOW(), 7),
('Gönüllülük Programı', 'Gönüllülük programı başvuruları açıldı.', FALSE, NULL, 8),
('Yeni Ofisimiz', 'İzmir ofisimiz hizmete açıldı.', TRUE, NOW(), 9);

INSERT INTO contact_messages (full_name, email, subject, message, is_read, read_by) VALUES
('Ece Kaya', 'ece.kaya@example.com', 'Eğitim ücretleri', 'Eğitim ücretleri hakkında bilgi alabilir miyim?', FALSE, NULL),
('Mert Çelik', 'mert.celik@example.com', 'Başvuru durumu', 'Başvurumun durumunu öğrenmek istiyorum.', TRUE, 1),
('İrem Şen', 'irem.sen@example.com', 'Etkinlik kaydı', 'Kariyer buluşmalarına nasıl katılabilirim?', FALSE, NULL),
('Oğuzhan Acar', 'oguzhan.acar@example.com', 'Sertifika', 'Eğitim sonunda sertifika veriliyor mu?', TRUE, 2),
('Melis Eren', 'melis.eren@example.com', 'Python eğitimi', 'Dersler çevrim içi mi yapılacak?', FALSE, NULL),
('Kaan Koç', 'kaan.koc@example.com', 'Ofis adresi', 'İstanbul ofisinin adresini paylaşır mısınız?', TRUE, 3),
('Aslı Aydın', 'asli.aydin@example.com', 'Yapay zekâ', 'Ön koşul bulunuyor mu?', FALSE, NULL),
('Emre Tunç', 'emre.tunc@example.com', 'İletişim eğitimi', 'Eğitim kaç saat sürüyor?', TRUE, 4),
('Buse Kılıç', 'buse.kilic@example.com', 'Grafik tasarım', 'Hangi programlar kullanılacak?', FALSE, NULL),
('Serkan Yıldız', 'serkan.yildiz@example.com', 'Girişimcilik', 'Başvuru son tarihi nedir?', FALSE, NULL);

INSERT INTO notifications (user_id, title, body, type, is_read) VALUES
(1, 'Yeni başvuru alındı', 'Web Tasarımı Eğitimi için yeni başvuru var.', 'application', FALSE),
(2, 'Yorum onaylandı', 'Bir eğitim yorumu yayınlandı.', 'comment', TRUE),
(3, 'Etkinlik yaklaşıyor', 'Kariyer Buluşmaları 10 gün sonra başlıyor.', 'event', FALSE),
(4, 'Eğitim güncellendi', 'Proje Yönetimi içeriği düzenlendi.', 'training', TRUE),
(5, 'Yeni mesaj var', 'İletişim formundan yeni mesaj alındı.', 'message', FALSE),
(6, 'Başvuru onaylandı', 'Python eğitimi başvurusu onaylandı.', 'application', TRUE),
(7, 'Duyuru yayınlandı', 'Yeni eğitim programları duyurusu yayınlandı.', 'announcement', FALSE),
(8, 'Yorum bekliyor', 'İncelenmesi gereken yeni bir yorum var.', 'comment', FALSE),
(9, 'Etkinlik taslağı', 'Teknoloji Zirvesi taslağı güncellendi.', 'event', TRUE),
(10, 'Sistem bildirimi', 'Profil bilgileriniz güncellendi.', 'system', TRUE);

-- Genel ayarlar örnek verisi
INSERT INTO settings (`key`, label, `value`, `type`) VALUES
('site_title', 'Site Başlığı', 'ODTÜ KALTEV', 'string'),
('default_language', 'Varsayılan Dil', 'tr', 'string'),
('items_per_page', 'Sayfa başına öğe', '10', 'number'),
('maintenance_mode', 'Bakım Modu', '0', 'boolean');
