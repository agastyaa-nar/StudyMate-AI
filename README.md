# AI Study Tracker

> Platform pelacakan belajar cerdas dengan AI untuk membantu mahasiswa dan pelajar mengoptimalkan performa akademik mereka.

[![Lovable](https://img.shields.io/badge/Built%20with-Lovable-ff69b4)](https://lovable.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Struktur Proyek](#-struktur-proyek)
- [Database Schema](#-database-schema)
- [Edge Functions (Backend API)](#-edge-functions-backend-api)
- [Instalasi & Setup](#-instalasi--setup)
- [Environment Variables](#-environment-variables)
- [Pengembangan](#-pengembangan)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)

## 🎯 Tentang Proyek

AI Study Tracker adalah aplikasi web full-stack yang dirancang untuk membantu pelajar dan mahasiswa melacak, menganalisis, dan mengoptimalkan kebiasaan belajar mereka. Aplikasi ini menggunakan kecerdasan buatan untuk memberikan insight personal dan rekomendasi belajar yang disesuaikan.

**URL Proyek**: https://lovable.dev/projects/22548a24-5da9-4bff-afdf-71afbb99ae82

### Masalah yang Dipecahkan

- ❌ Kesulitan melacak jam belajar dan progress
- ❌ Tidak ada insight tentang pola belajar yang efektif
- ❌ Manajemen tugas dan ujian yang tidak terorganisir
- ❌ Kurangnya motivasi dan gamifikasi dalam proses belajar

### Solusi Kami

- ✅ Dashboard terintegrasi dengan tracking otomatis
- ✅ AI insights untuk optimasi belajar
- ✅ Calendar dan task management
- ✅ Sistem achievement dan streak untuk motivasi
- ✅ Journal belajar dengan refleksi AI

## ✨ Fitur Utama

### 📊 Dashboard Interaktif
- Real-time statistics (jam belajar, subjects aktif, goal achievement)
- Visual progress tracking untuk setiap mata pelajaran
- Study hours chart dengan data mingguan
- Calendar view untuk deadline dan tasks
- AI-powered insights dan rekomendasi

### 📝 Study Planner
- Buat dan kelola study plans dengan deadline
- Task breakdown dengan estimasi waktu
- Prioritas dan difficulty levels
- Track completion status
- Automatic progress calculation

### 📈 Analytics
- Detailed study statistics per subject
- Time distribution analysis
- Performance trends over time
- Productivity patterns
- Exportable reports

### 🏆 Achievements & Gamification
- Badge system untuk milestones
- Study streak tracking
- Point-based progression
- Rarity tiers (Common, Rare, Epic, Legendary)
- Progress visualization

### 📖 Study Journal
- Daily reflection entries
- AI-generated summaries
- Mood tracking
- Key topics extraction
- Study duration logging
- Smart insights dari pola belajar

### 🎴 Flashcards
- Create dan organize flashcard sets
- Subject categorization
- Difficulty levels
- Mastery tracking
- Spaced repetition system
- Review scheduling

### 🔐 Authentication
- Secure email/password authentication
- Session management
- Auto-confirm email (development mode)
- Profile management

## 🛠 Teknologi

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **React Router DOM** - Client-side routing
- **React Query** - Data fetching & caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **Lucide React** - Icon system
- **date-fns** - Date manipulation

### Backend (Lovable Cloud)
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Edge Functions (serverless)
  - Authentication & Authorization

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static typing

## 📁 Struktur Proyek

```
ai-study-tracker/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── auth/           # Authentication components
│   │   ├── layout/         # Layout components (Header, Navigation, etc.)
│   │   ├── AIInsights.tsx  # AI recommendations component
│   │   ├── StudyCalendar.tsx
│   │   ├── StudyHoursChart.tsx
│   │   ├── StudyLogInput.tsx
│   │   ├── SubjectProgress.tsx
│   │   └── VoiceInput.tsx
│   │
│   ├── pages/              # Page components (routes)
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── StudyPlanner.tsx
│   │   ├── Analytics.tsx
│   │   ├── Achievements.tsx
│   │   ├── StudyJournal.tsx
│   │   ├── Flashcards.tsx
│   │   └── NotFound.tsx
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts      # Authentication hook
│   │   ├── useDashboard.ts # Dashboard data hook
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── integrations/       # Third-party integrations
│   │   └── supabase/
│   │       ├── client.ts   # Supabase client config
│   │       └── types.ts    # Auto-generated DB types
│   │
│   ├── lib/                # Utility libraries
│   │   ├── supabase.ts     # Supabase helper functions
│   │   └── utils.ts        # General utilities
│   │
│   ├── App.tsx             # Root application component
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles & design tokens
│   └── vite-env.d.ts       # Vite type definitions
│
├── supabase/
│   ├── functions/          # Edge Functions (serverless backend)
│   │   ├── get-dashboard-data/
│   │   ├── process-study-log/
│   │   └── get-study-stats/
│   │
│   ├── migrations/         # Database migrations
│   └── config.toml         # Supabase configuration
│
├── public/                 # Static assets
├── index.html             # HTML entry point
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file

```

## 🗄 Database Schema

### Tables

#### `profiles`
User profile information
- `id` (uuid, PK)
- `user_id` (uuid, references auth.users)
- `full_name` (text)
- `avatar_url` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `study_plans`
Study plans dengan deadline dan durasi
- `id` (uuid, PK)
- `user_id` (uuid)
- `title` (text)
- `subject` (text)
- `description` (text)
- `deadline` (date)
- `duration` (integer) - dalam menit
- `difficulty` (text) - easy/medium/hard
- `completed` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies**: Users hanya bisa CRUD data mereka sendiri

#### `study_tasks`
Task breakdown dari study plans
- `id` (uuid, PK)
- `plan_id` (uuid, FK to study_plans)
- `title` (text)
- `estimated_time` (integer) - dalam menit
- `scheduled_date` (date)
- `completed` (boolean)
- `created_at` (timestamp)

**RLS Policies**: Users hanya bisa CRUD tasks dari plans mereka

#### `journal_entries`
Daily study journal dengan AI features
- `id` (uuid, PK)
- `user_id` (uuid)
- `date` (date)
- `title` (text)
- `content` (text)
- `entry_type` (text) - reflection/lesson/insight
- `mood` (text)
- `study_duration` (integer)
- `subjects` (text[])
- `key_topics` (text[])
- `insights` (text[])
- `ai_summary` (text) - AI-generated summary
- `ai_reflection` (text) - AI-generated reflection
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies**: Users hanya bisa CRUD journal mereka sendiri

#### `flashcards`
Flashcard system untuk memorization
- `id` (uuid, PK)
- `user_id` (uuid)
- `subject` (text)
- `question` (text)
- `answer` (text)
- `hint` (text)
- `difficulty` (text) - easy/medium/hard
- `mastery` (integer) - 0-100
- `last_reviewed` (date)
- `tags` (text[])
- `created_at` (timestamp)

**RLS Policies**: Users hanya bisa CRUD flashcards mereka sendiri

#### `achievements`
Gamification system
- `id` (uuid, PK)
- `user_id` (uuid)
- `achievement_key` (text, unique per user)
- `title` (text)
- `description` (text)
- `category` (text) - study/streak/milestone
- `rarity` (text) - common/rare/epic/legendary
- `points` (integer)
- `progress` (integer)
- `max_progress` (integer)
- `unlocked` (boolean)
- `unlocked_date` (date)
- `created_at` (timestamp)

**RLS Policies**: Users bisa view, create, update achievements mereka (no delete)

#### `user_streaks`
Study streak tracking
- `id` (uuid, PK)
- `user_id` (uuid)
- `streak_type` (text) - daily/weekly
- `current_streak` (integer)
- `longest_streak` (integer)
- `last_study_date` (date)
- `updated_at` (timestamp)

**RLS Policies**: Users bisa view, create, update streaks mereka (no delete)

### Database Functions

#### `update_updated_at_column()`
Trigger function untuk auto-update `updated_at` timestamps
```sql
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;
```

## 🔌 Edge Functions (Backend API)

Edge Functions adalah serverless API endpoints yang auto-deploy dan auto-scale.

### 1. `get-dashboard-data`
**Endpoint**: `/functions/v1/get-dashboard-data`
**Method**: POST
**Auth**: Required

Mengambil semua data untuk dashboard:
- Active subjects dengan progress
- Study hours data (7 hari terakhir)
- Calendar events (upcoming tasks/exams)
- AI insights
- Stats (total hours, active subjects, deadlines)

**Response**:
```typescript
{
  subjects: Array<{
    id: string;
    name: string;
    color: string;
    target_hours_per_week: number;
    weekly_hours: number;
    progress: number;
  }>;
  studyHoursData: Array<{ date: string; hours: number }>;
  calendarEvents: Array<{
    id: string;
    title: string;
    date: string;
    type: string;
    priority: string;
  }>;
  insights: Array<any>;
  stats: {
    total_hours_this_week: number;
    total_hours_this_month: number;
    active_subjects: number;
    upcoming_deadlines: number;
  };
}
```

### 2. `process-study-log`
**Endpoint**: `/functions/v1/process-study-log`
**Method**: POST
**Auth**: Required

Memproses input study log (text atau voice) dan menyimpan ke database.

**Request**:
```typescript
{
  rawText: string; // e.g., "Belajar matematika 2 jam"
}
```

**Response**:
```typescript
{
  success: boolean;
  message: string;
  data?: {
    subject: string;
    duration: number;
    topics?: string[];
  };
}
```

### 3. `get-study-stats`
**Endpoint**: `/functions/v1/get-study-stats`
**Method**: POST (SQL function)
**Auth**: Required

Mengambil statistik belajar detail untuk analytics page.

## 🚀 Instalasi & Setup

### Prerequisites
- Node.js >= 18.0.0
- npm atau yarn
- Git

### Local Development

1. **Clone repository**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

File `.env` sudah auto-generated oleh Lovable Cloud. Pastikan berisi:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

4. **Run development server**
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

Output akan ada di folder `dist/`

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key | Yes |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID | Yes |

⚠️ **PENTING**: File `.env` adalah auto-generated dan TIDAK boleh diedit manual.

## 👨‍💻 Pengembangan

### Code Style
- Menggunakan TypeScript untuk type safety
- ESLint untuk linting
- Prettier untuk formatting (opsional)
- Tailwind utility classes untuk styling
- Component-based architecture

### Adding New Features

1. **Buat component baru** di `src/components/`
2. **Buat page baru** (jika perlu) di `src/pages/`
3. **Tambah route** di `src/App.tsx`
4. **Buat database tables** (jika perlu) via migration
5. **Buat Edge Function** (jika perlu backend logic)
6. **Update types** di `src/lib/supabase.ts`

### Database Migrations

Untuk membuat perubahan database, gunakan Lovable AI dengan command:
```
"Buatkan migration untuk tabel X dengan kolom Y"
```

Migration files akan otomatis dibuat di `supabase/migrations/`

### Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 🌐 Deployment

### Deploy via Lovable (Recommended)

1. Buka project di [Lovable](https://lovable.dev/projects/22548a24-5da9-4bff-afdf-71afbb99ae82)
2. Klik tombol **"Publish"** di top-right
3. Aplikasi akan otomatis di-deploy ke Lovable hosting
4. Edge Functions akan auto-deploy bersamaan

### Custom Domain

1. Navigate ke Project > Settings > Domains
2. Klik "Connect Domain"
3. Follow instruksi untuk setup DNS
4. Verifikasi domain

Docs: [Setting up custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

### Deploy ke Platform Lain

Karena ini adalah static React app, bisa di-deploy ke:
- Vercel
- Netlify
- GitHub Pages
- CloudFlare Pages

**Note**: Pastikan environment variables ter-setup dengan benar.

## 🤝 Kontribusi

Contributions are welcome! Berikut cara berkontribusi:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Workflow

1. **Edit via Lovable**: Gunakan [Lovable AI](https://lovable.dev/projects/22548a24-5da9-4bff-afdf-71afbb99ae82) untuk edit dengan natural language
2. **Edit via IDE**: Clone repo dan edit locally, push changes akan sync ke Lovable
3. **Edit via GitHub**: Edit file directly di GitHub web interface
4. **Edit via Codespaces**: Gunakan GitHub Codespaces untuk cloud-based IDE

## 📚 Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
