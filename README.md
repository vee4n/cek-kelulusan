# 🎓 Cek Kelulusan — Portal Pengumuman Kelulusan Siswa

Portal web resmi untuk pengecekan status kelulusan siswa. Dibangun dengan Next.js, TypeScript, Tailwind CSS, Prisma, dan PostgreSQL.

---

## ✨ Fitur

- Login aman menggunakan nama siswa + nomor induk (NIS)
- Validasi di server (tidak bisa diintip dari browser)
- Menampilkan data kelulusan: Nama, TTL, NISN, Status
- Desain formal seperti dokumen resmi pemerintah
- Responsif untuk mobile dan desktop
- Bahasa Indonesia sepenuhnya

---

## 🗂 Struktur Proyek

```
cek-kelulusan/
├── prisma/
│   ├── schema.prisma          # Model database
│   └── seed.ts                # Data contoh siswa
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/login/
│   │   │       └── route.ts   # API endpoint login (server-side)
│   │   ├── globals.css        # Styling global + animasi
│   │   ├── layout.tsx         # Root layout + metadata
│   │   └── page.tsx           # Halaman utama
│   ├── components/
│   │   ├── LoginForm.tsx      # Form input nama & NIS
│   │   └── ResultCard.tsx     # Kartu hasil kelulusan
│   └── lib/
│       └── prisma.ts          # Prisma client singleton
├── .env.example               # Contoh environment variables
├── vercel.json                # Konfigurasi Vercel
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 🗃 Skema Database

```prisma
model Siswa {
  id             Int              @id @default(autoincrement())
  nama           String           // Login: username
  ttl            String           // "Jakarta, 12 Mei 2006"
  nisn           String           @unique
  nomorInduk     String           @unique  // Login: password
  statusKelulusan StatusKelulusan @default(BELUM_DITENTUKAN)
  createdAt      DateTime         @default(now())
  updatedAt      DateTime         @updatedAt
}

enum StatusKelulusan {
  LULUS
  TIDAK_LULUS
  BELUM_DITENTUKAN
}
```

---

## 📋 Contoh Data Seed

| Nama                | NIS (Password) | NISN       | Status          |
|---------------------|----------------|------------|-----------------|
| Ahmad Fauzi         | 2024001        | 0061234567 | LULUS           |
| Siti Nurhaliza      | 2024002        | 0062345678 | LULUS           |
| Budi Santoso        | 2024003        | 0063456789 | LULUS           |
| Dewi Rahayu         | 2024004        | 0054567890 | TIDAK LULUS     |
| Muhammad Rizky      | 2024005        | 0065678901 | LULUS           |
| Putri Anjali        | 2024006        | 0066789012 | LULUS           |
| Eko Prasetyo        | 2024007        | 0057890123 | BELUM DITENTUKAN|
| Nurul Hidayah       | 2024008        | 0068901234 | LULUS           |

---

## 🚀 Setup Lokal (Development)

### Prasyarat
- Node.js >= 18.x
- npm atau yarn
- PostgreSQL database (lokal atau cloud: Neon, Supabase, Railway)

### Langkah 1 — Clone & Install

```bash
git clone https://github.com/username/cek-kelulusan.git
cd cek-kelulusan
npm install
```

### Langkah 2 — Konfigurasi Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` dan isi:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require"
```

> **Catatan:** Jika menggunakan PostgreSQL lokal tanpa SSL:
> ```env
> DATABASE_URL="postgresql://postgres:password@localhost:5432/cek_kelulusan"
> DIRECT_URL="postgresql://postgres:password@localhost:5432/cek_kelulusan"
> ```

### Langkah 3 — Setup Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema ke database (development)
npm run db:push

# Isi data contoh
npm run db:seed
```

### Langkah 4 — Jalankan Dev Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

**Login contoh:** Username: `Ahmad Fauzi` | Password: `2024001`

---

## 📦 Deploy ke Vercel

### Opsi A — Menggunakan Vercel Postgres (Direkomendasikan)

1. **Push ke GitHub:**
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/username/cek-kelulusan.git
   git push -u origin main
   ```

2. **Import di Vercel:**
   - Buka [vercel.com/new](https://vercel.com/new)
   - Pilih repository `cek-kelulusan`
   - Klik **Deploy** (biarkan settings default)

3. **Tambahkan Vercel Postgres:**
   - Di dashboard project → tab **Storage**
   - Klik **Create Database** → pilih **Postgres**
   - Ikuti wizard, lalu klik **Connect**
   - Vercel otomatis menambahkan `DATABASE_URL` dan `DIRECT_URL`

4. **Jalankan Migrasi & Seed via Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel env pull .env.production.local
   npx prisma db push
   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
   ```

5. **Redeploy:**
   - Vercel akan auto-deploy setiap kali Anda push ke `main`

---

### Opsi B — Menggunakan Neon (PostgreSQL Serverless Gratis)

1. Daftar di [neon.tech](https://neon.tech) dan buat project baru
2. Salin **Connection String** dari dashboard Neon
3. Di Vercel → Settings → Environment Variables, tambahkan:
   ```
   DATABASE_URL  = postgres://user:pass@ep-xxx.neon.tech/neondb?sslmode=require
   DIRECT_URL    = postgres://user:pass@ep-xxx.neon.tech/neondb?sslmode=require
   ```
4. Deploy dan jalankan seed seperti Opsi A

---

### Opsi C — Menggunakan Supabase

1. Buat project di [supabase.com](https://supabase.com)
2. Settings → Database → **Connection string** (Transaction mode untuk `DATABASE_URL`, Session mode untuk `DIRECT_URL`)
3. Tambahkan ke Vercel environment variables
4. Jalankan:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

---

## 🔧 Menambahkan Data Siswa Nyata

### Via Prisma Studio (GUI):
```bash
npm run db:studio
# Buka http://localhost:5555
```

### Via SQL langsung:
```sql
INSERT INTO siswa (nama, ttl, nisn, "nomorInduk", "statusKelulusan", "createdAt", "updatedAt")
VALUES
  ('Nama Siswa', 'Kota, DD Bulan YYYY', '0012345678', '2024009', 'LULUS', NOW(), NOW());
```

### Via seed.ts:
Tambahkan entri baru di array `siswaSeed` di `prisma/seed.ts`, lalu jalankan:
```bash
npm run db:seed
```

---

## 🔒 Keamanan

- **Validasi server-side:** Login diproses di `/api/auth/login` — tidak ada data yang dikirim ke client sebelum tervalidasi
- **No data exposure:** API hanya mengembalikan data milik siswa yang berhasil login
- **Generic error messages:** Pesan error tidak membocorkan apakah username atau password yang salah
- **noindex robots:** Halaman tidak diindeks mesin pencari
- **nomorInduk tidak pernah dikirim ke client**

---

## 🛠 Perintah Berguna

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema ke database |
| `npm run db:migrate` | Buat migration file |
| `npm run db:seed` | Isi data contoh |
| `npm run db:studio` | Buka Prisma Studio (GUI database) |

---

## ❓ Troubleshooting

**Error: `Can't reach database server`**
→ Periksa `DATABASE_URL` di `.env.local`, pastikan host, port, user, password benar.

**Error: `PrismaClientInitializationError`**
→ Jalankan `npm run db:generate` untuk regenerate Prisma client.

**Data seed tidak muncul**
→ Jalankan ulang `npm run db:seed`. Perintah ini akan hapus data lama dan isi ulang.

**Build gagal di Vercel**
→ Pastikan `DATABASE_URL` dan `DIRECT_URL` sudah diset di Vercel Environment Variables.

---

## 📝 Lisensi

Proyek ini dibuat untuk keperluan pendidikan dan pengumuman sekolah. Bebas digunakan dan dimodifikasi sesuai kebutuhan.
# cek-kelulusan
