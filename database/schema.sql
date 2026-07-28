-- ODTÜ KALTEV Yönetim Paneli
-- MySQL 8.0+ veritabanı şeması

CREATE DATABASE IF NOT EXISTS odtu_kaltev
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_turkish_ci;

USE odtu_kaltev;

CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor', 'viewer') NOT NULL DEFAULT 'editor',
  avatar_url VARCHAR(500) NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE pages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  content LONGTEXT NULL,
  page_type ENUM('home', 'about', 'contact', 'help') NOT NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_pages_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE trainings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  summary TEXT NULL,
  content LONGTEXT NULL,
  instructor_name VARCHAR(150) NULL,
  start_date DATE NULL,
  end_date DATE NULL,
  capacity SMALLINT UNSIGNED NULL,
  application_deadline DATE NULL,
  cover_image_url VARCHAR(500) NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_trainings_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_trainings_status (status)
) ENGINE=InnoDB;

CREATE TABLE events (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description LONGTEXT NULL,
  location VARCHAR(250) NULL,
  start_at DATETIME NOT NULL,
  end_at DATETIME NULL,
  cover_image_url VARCHAR(500) NULL,
  status ENUM('draft', 'published', 'cancelled') NOT NULL DEFAULT 'draft',
  created_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_events_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_events_start_at (start_at),
  INDEX idx_events_status (status)
) ENGINE=InnoDB;

CREATE TABLE people (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  title VARCHAR(150) NULL,
  biography TEXT NULL,
  email VARCHAR(190) NULL,
  phone VARCHAR(50) NULL,
  photo_url VARCHAR(500) NULL,
  display_order INT UNSIGNED NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE offices (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NULL,
  email VARCHAR(190) NULL,
  map_url VARCHAR(500) NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE applications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  training_id BIGINT UNSIGNED NULL,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(50) NULL,
  note TEXT NULL,
  status ENUM('new', 'reviewing', 'approved', 'rejected') NOT NULL DEFAULT 'new',
  reviewed_by BIGINT UNSIGNED NULL,
  reviewed_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_applications_training FOREIGN KEY (training_id) REFERENCES trainings(id) ON DELETE SET NULL,
  CONSTRAINT fk_applications_user FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_applications_status (status),
  INDEX idx_applications_training (training_id)
) ENGINE=InnoDB;

CREATE TABLE comments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  training_id BIGINT UNSIGNED NULL,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NULL,
  body TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  moderated_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  moderated_at DATETIME NULL,
  CONSTRAINT fk_comments_training FOREIGN KEY (training_id) REFERENCES trainings(id) ON DELETE SET NULL,
  CONSTRAINT fk_comments_user FOREIGN KEY (moderated_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_comments_status (status)
) ENGINE=InnoDB;

CREATE TABLE announcements (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  body TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_announcements_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE contact_messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL,
  subject VARCHAR(250) NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  read_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_messages_user FOREIGN KEY (read_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_messages_read (is_read)
) ENGINE=InnoDB;

CREATE TABLE notifications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(250) NOT NULL,
  body TEXT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'system',
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_notifications_user_read (user_id, is_read)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS settings (
  `key` VARCHAR(100) NOT NULL PRIMARY KEY,
  label VARCHAR(200) NOT NULL,
  `value` TEXT NULL,
  `type` ENUM('string','boolean','number') NOT NULL DEFAULT 'string',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- İlk yönetici kaydı: parola alanına bcrypt/argon2 ile üretilmiş hash yazılmalıdır.
INSERT INTO users (full_name, email, password_hash, role)
VALUES ('Özgür Efe', 'yonetici@odtukaltev.org', '$2b$12$CHANGE_THIS_TO_A_REAL_PASSWORD_HASH', 'admin');

INSERT INTO announcements (title, body, is_published, published_at, created_by)
VALUES (
  '2026 Güz Dönemi Başvuruları Başladı',
  'ODTÜ KALTEV eğitim programlarına başvurularınızı şimdi tamamlayabilirsiniz.',
  TRUE,
  NOW(),
  1
);
