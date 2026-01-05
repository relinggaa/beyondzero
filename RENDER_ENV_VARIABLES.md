# Environment Variables untuk Render Deployment

## Environment Variables Wajib (Required)

Isi environment variables berikut di Render Dashboard:

### 1. Application Settings
```
APP_NAME=Intelecta
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app-name.onrender.com
APP_KEY=base64:YOUR_APP_KEY_HERE
```

**Cara mendapatkan APP_KEY:**
- Di local, jalankan: `php artisan key:generate`
- Copy value dari `.env` file (format: `base64:...`)
- Atau klik tombol "Generate" di Render untuk generate otomatis

### 2. Database Configuration (jika menggunakan database)

**Untuk PostgreSQL (Recommended di Render):**
```
DB_CONNECTION=pgsql
DB_HOST=<database-host-dari-render>
DB_PORT=5432
DB_DATABASE=<database-name>
DB_USERNAME=<username-dari-render>
DB_PASSWORD=<password-dari-render>
```

**Untuk MySQL:**
```
DB_CONNECTION=mysql
DB_HOST=<database-host-dari-render>
DB_PORT=3306
DB_DATABASE=<database-name>
DB_USERNAME=<username-dari-render>
DB_PASSWORD=<password-dari-render>
```

**Untuk SQLite (tidak recommended untuk production):**
```
DB_CONNECTION=sqlite
```

### 3. Cache & Session
```
CACHE_DRIVER=file
SESSION_DRIVER=cookie
SESSION_LIFETIME=120
QUEUE_CONNECTION=sync
```

### 4. Logging
```
LOG_CHANNEL=stderr
LOG_LEVEL=error
```

## Environment Variables Opsional

### Mail Configuration (jika menggunakan email)
```
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"
```

### AWS S3 (jika menggunakan file storage)
```
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your-bucket-name
AWS_USE_PATH_STYLE_ENDPOINT=false
```

### Other Services (jika digunakan)
```
POSTMARK_TOKEN=your-postmark-token
RESEND_KEY=your-resend-key
SLACK_BOT_USER_OAUTH_TOKEN=your-slack-token
```

## Cara Setup di Render:

1. **APP_KEY**: 
   - Klik tombol "Generate" di Render (akan generate otomatis)
   - Atau copy dari `.env` local Anda

2. **APP_URL**: 
   - Setelah deploy, Render akan memberikan URL seperti: `https://your-app-name.onrender.com`
   - Update APP_URL dengan URL tersebut

3. **Database**:
   - Buat PostgreSQL/MySQL database di Render Dashboard
   - Render akan otomatis memberikan connection string
   - Copy values ke environment variables

4. **Setelah semua env vars diisi, deploy ulang aplikasi**

## Catatan Penting:

- Jangan commit file `.env` ke Git (sudah ada di `.gitignore`)
- APP_KEY harus unik untuk setiap environment
- Database credentials akan diberikan oleh Render saat membuat database
- Untuk file upload, gunakan S3 atau storage cloud (filesystem di Render bersifat sementara)

