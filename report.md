# OSINT-Hive Project Report

## 📋 Executive Summary
**OSINT-Hive** is a sophisticated Next.js application designed for Open Source Intelligence (OSINT) gathering and AI-powered career guidance. The platform enables users to search across multiple data sources (LinkedIn, GitHub, Internal DB), analyze skill gaps with AI-driven recommendations, and visualize learning paths.

---

## 🛠️ Technology Stack

### Core Framework
- **Next.js 16.0.10** (App Router)
- **React 19.2.1**
- **TypeScript 5**

### UI & Styling
- **Tailwind CSS 4** with PostCSS
- **Radix UI** components (Avatar, Checkbox, Dialog, Label, Progress, Scroll Area, Separator, Slot, Tabs)
- **Framer Motion** for animations
- **Lucide React** for icons
- **class-variance-authority** & **clsx** for styling utilities
- **Custom Background Particles** component

### Backend & Data
- **Supabase** (@supabase/supabase-js) - Authentication & Database
- **Google Gemini AI** (@google/generative-ai) - AI-powered analysis
- **Stripe** - Payment processing (premium features)
- **Axios** - HTTP client

### Data Processing
- **D3.js** - Network graph visualization
- **React Flow** (@xyflow/react) - Interactive diagrams
- **React Markdown** - Markdown rendering

### Datasets
- **10k LinkedIn Profiles** (India) - `.txt` and `.csv` formats
- **GitHub Users** - Cleaned CSV with Indian developers
- **Resume Dataset** - CSV format
- **Mock Data** - 100 hero profiles for demo

---

## 📁 Project Structure Analysis

### **Root Files**
| File | Purpose |
|------|---------|
| `package.json` | Dependencies management |
| `.env.local` | Environment variables (API keys) |
| `next.config.ts` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `tsconfig.json` | TypeScript configuration |
| `components.json` | Shadcn UI configuration |
| `report.md` | This documentation |

---

## 🗂️ Directory Breakdown

### **`src/lib/`** - Core Library Modules

#### 🧠 **AI & Intelligence**
- **`gap-analysis-ai.ts`**
  - **Purpose**: AI-powered skill gap analysis engine
  - **Features**:
    - Heuristic persona detection (Systems Engineer, Backend, Frontend, Student)
    - Context-aware learning path generation
    - Dynamic reasoning based on candidate profile
    - Intelligent suggestions for React, Node.js, AWS, SQL, TypeScript
  - **Key Functions**: `generateGapAnalysis()`, `generateOverallSuggestion()`

- **`gemini.ts`**
  - **Purpose**: Google Generative AI client initialization
  - **Model**: gemini-1.5-flash

#### 📊 **Data Access**
- **`linkedin-search.ts`**
  - **Purpose**: Search and filter 10k LinkedIn profiles
  - **Features**:
    - Keyword search (name, headline, summary)
    - Role/occupation filtering
    - Company filtering
    - Skills-based filtering
    - Experience range filtering (0-2, 3-5, 5-10, 10+ years)
  - **Key Functions**: `searchLinkedInData()`, `getLinkedInProfile()`

- **`github-data.ts`**
  - **Purpose**: Parse and search GitHub user data from CSV
  - **Features**:
    - CSV parsing with quoted field handling
    - User lookup by username
    - Skills extraction from languages
  - **Key Functions**: `getGithubData()`, `getGithubUserByUsername()`

- **`mock-data.ts`**
  - **Purpose**: Generate demo data for testing
  - **Contains**: 10 `HERO_PROFILES` + 90 generated profiles
  - **Use Case**: Seed database without real user data

#### 📚 **Course & Content**
- **`course-data.ts`**
  - **Purpose**: Static course/resource database
  - **Topics Covered**: HTML, CSS, JavaScript, React, Node.js, TypeScript, SQL, AWS, Docker, Kubernetes
  - **Resource Types**: Video courses, documentation, interactive tutorials, articles

#### 🔍 **OSINT Tools**
- **`osint.ts`**
  - **Purpose**: Google Custom Search integration
  - **Features**: Profile search, email extraction via regex

#### 🔐 **Infrastructure**
- **`supabase.ts`** - Supabase client initialization
- **`utils.ts`** - Utility functions (cn for classNames)

---

### **`src/app/`** - Application Pages & Routes

#### 📄 **Pages**
| Page | Route | Purpose | Key Features |
|------|-------|---------|--------------|
| **Landing Page** | `/` | Entry point | Hero section, stats, CTA buttons, background particles |
| **Dashboard** | `/dashboard` | Command center | Resume upload, profile management, recommended mentors (Min-Heap algorithm), OSINT logs, skills display |
| **Search** | `/search` | Intel search | Multi-source search (LinkedIn, GitHub, Internal, OSINT), advanced filters, result cards |
| **Gap Analysis** | `/gap-analysis` | Skill comparison | Vector comparison (user vs mentor), AI recovery plan, missing skills visualization |
| **Connections** | `/connections` | Network graph | D3.js visualization (planned/proto) |

#### 🔗 **Profile Pages** (Dynamic Routes)
The application has **4 profile page variants**, each with unique styling:

1. **`/profile/linkedin/[id]`**
   - **Data Source**: LinkedIn dataset (10k profiles)
   - **Style**: Cyberpunk/terminal aesthetic (cyan/black theme)
   - **Features**: 
     - Skills arsenal (top-rated + secondary)
     - Experience timeline with current indicator
     - Education origin
     - Dynamic gap analysis with AI recovery plan
     - Match grade calculation (A-F scale)

2. **`/profile/github/[id]`**
   - **Data Source**: GitHub CSV dataset
   - **Style**: Minimalist monospace (slate theme)
   - **Features**:
     - Influence metrics (stars, followers, repos)
     - Activity level (contributions)
     - Career roadmap timeline
     - Hireable status indicator
     - Cold email generator

3. **`/profile/internal/[id]`**
   - **Data Source**: Mock internal database
   - **Style**: Corporate/professional
   - **Features**: Internal employee validation

4. **`/profile/osint/[id]`**
   - **Data Source**: Google Custom Search
   - **Style**: OSINT/intelligence theme
   - **Features**: External profile aggregation

5. **`/profile/[id]`** (Generic Fallback)
   - Multi-source detection and routing

#### 🌐 **API Routes**
Located in `src/app/api/`:

| Route | Purpose | Method |
|-------|---------|--------|
| **`/api/search`** | Hybrid search (Mock DB → OSINT fallback) | POST |
| **`/api/gap-analysis`** | Generate AI skill analysis | POST |
| **`/api/parse-roadmap`** | Resume parsing with Gemini AI | POST |
| **`/api/roadmap/content`** | Roadmap content generation | GET |
| **`/api/referral`** | Referral probability scoring (stub) | POST |

---

### **`src/components/`** - UI Components

#### 🎨 **Feature Components**
- **`interactive-roadmap.tsx`**
  - **Purpose**: Visual learning path flowchart
  - **Tech**: CSS Grid/Flex layout
  - **Features**: Clickable nodes (HTML → CSS → JS → React/Backend), resource sidebar (Sheet), "Mark as Complete" tracking

- **`connection-graph.tsx`**
  - **Purpose**: D3.js network visualization
  - **Flow**: Start → User → Target mentor
  - **Style**: Force-directed graph

- **`osint-logs.tsx`**
  - **Purpose**: Scrolling terminal aesthetic
  - **Effect**: Simulated "scanned nodes" for hacker vibe

- **`edit-profile-dialog.tsx`**
  - **Purpose**: Profile editing modal
  - **Features**: Form validation, Supabase integration

- **`payment-modal.tsx`**
  - **Purpose**: Stripe payment interface
  - **Use Case**: Premium feature unlock

#### 📦 **UI Library** (`src/components/ui/`)
Shadcn UI components:
- `button.tsx`, `card.tsx`, `input.tsx`, `badge.tsx`, `progress.tsx`
- `alert.tsx`, `label.tsx`, `checkbox.tsx`, `separator.tsx`
- `avatar.tsx`, `dialog.tsx`, `sheet.tsx`, `scroll-area.tsx`, `tabs.tsx`
- `background-particles.tsx` (custom animated background)

#### 📊 **Analytics & Dashboards**
- **`components/analytics/`** - Analytics widgets (planned)
- **`components/dashboard/`** - Dashboard-specific components
- **`components/profile/`** - Profile page components

---

## 🚀 Features & Capabilities

### ✅ **Implemented Features**
1. **Multi-Source Search**
   - LinkedIn (10k profiles)
   - GitHub (Indian developers)
   - Internal mock database
   - Google Custom Search (OSINT)

2. **AI-Powered Gap Analysis**
   - Skill-based persona detection
   - Context-aware learning paths
   - Resource recommendations with links
   - Personalized suggestions

3. **Profile Management**
   - Resume upload (PDF/DOCX)
   - Gemini AI parsing
   - Supabase storage
   - Profile editing

4. **Interactive Roadmap**
   - Visual learning path
   - Curated course database
   - Resource sidebar
   - Progress tracking

5. **Advanced Filtering**
   - Role-based search
   - Company filtering
   - Skills matching
   - Experience range

6. **Authentication**
   - Supabase Auth (login/signup)
   - Protected routes

### 🔄 **In Progress / Planned**
- Referral probability scoring (stub exists)
- Network graph visualization (proto)
- Payment integration (modal exists)
- Analytics dashboard
- Cold email generation (UI exists)

---

## 💾 Database Schema

### Supabase Tables (from `supabase/migrations/001_create_profiles.sql`)
```sql
profiles
├── id (uuid, primary key)
├── user_id (uuid, foreign key)
├── full_name (text)
├── email (text)
├── skills (text[])
├── experience (text)
├── education (text)
├── resume_url (text)
├── created_at (timestamp)
└── updated_at (timestamp)
```

---

## 🧪 Testing & Verification

### Data Sources
- **LinkedIn**: `DATA-SETS/10k_data_li_india.txt` (JSONL format)
- **GitHub**: `DATA-SETS/Cleaned Better Schema Github Indian Users Deep Data.csv`
- **Resumes**: `DATA-SETS/Resume.csv`

### Mock Data
- 100 pre-seeded profiles in `src/lib/mock-data.ts`
- Used for demo and development

---

## 🎯 Key Algorithms

### 1. **Min-Heap Recommendation**
- Used in Dashboard to rank mentors
- Prioritizes best skill matches

### 2. **Hybrid Search**
- Priority: Internal DB → LinkedIn → GitHub → OSINT
- Falls back gracefully

### 3. **Skill Extraction**
- Regex-based for LinkedIn (scans headline/summary)
- CSV column-based for GitHub

### 4. **Experience Calculation**
- Accurate month-level computation
- Handles current positions (no end date)

---

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (#22d3ee) - Highlights, CTAs
- **Background**: Slate 950 (#020617) - Dark theme
- **Accent**: Yellow (#fbbf24) - Roadmap nodes
- **Success**: Green (#10b981) - Matches
- **Warning**: Amber (#f59e0b) - Gaps

### Typography
- **Font**: Geist (Vercel's font family)
- **Style**: Monospace for terminal aesthetics

### Animations
- Framer Motion for page transitions
- Pulse effects for live status
- Hover state transformations

---

## 🔑 Environment Variables Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Google Gemini AI
GEMINI_API_KEY=

# Google Custom Search (OSINT)
GOOGLE_SEARCH_API_KEY=
GOOGLE_SEARCH_ENGINE_ID=

# Stripe (Optional)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## 📊 Metrics & Performance

### Dataset Size
- **1.2M+ Profiles Indexed** (marketing claim)
- **10k LinkedIn Profiles** (actual)
- **~5k GitHub Users** (estimated from CSV)

### Search Performance
- **0.02s Search Latency** (claimed)
- In-memory search for LinkedIn/GitHub
- Streaming file read for efficiency

### Match Accuracy
- **98% Match Accuracy** (claimed)
- Powered by heuristic engine + AI reasoning

---

## 🐛 Known Issues & Technical Debt

1. **Roadmap Content** - API route exists but not fully integrated
2. **Referral Scoring** - Stub implementation only
3. **Network Graph** - Proto stage, needs completion
4. **Email Generation** - UI exists, no backend logic
5. **Payment Flow** - Modal exists, Stripe integration incomplete

---

## 📈 Future Enhancements

1. **Real-time Updates** - WebSocket for live OSINT scans
2. **Advanced Analytics** - Profile performance metrics
3. **AI Chat Assistant** - Gemini-powered career advice
4. **Bulk Operations** - Import/export profiles
5. **Mobile App** - React Native version
6. **Social Features** - Connect directly with mentors

---

## 🎓 Learning & Development Value

### Skills Demonstrated
- **Full-Stack Development**: Next.js, TypeScript, Supabase
- **AI Integration**: Google Gemini for parsing & analysis
- **Data Processing**: CSV parsing, JSONL streaming
- **Search Algorithms**: Hybrid multi-source search
- **UI/UX Design**: Multiple theme variants, animations
- **Database Design**: Supabase schema, migrations
- **API Development**: RESTful routes, error handling

### Best Practices
- TypeScript for type safety
- Server-side rendering (SSR) for profile pages
- Component modularity (Shadcn UI pattern)
- Environment-based configuration
- Git-ignored sensitive files

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

---

## 📝 Additional Scripts

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🏆 Project Highlights

1. **Multi-Persona Gap Analysis** - Detects if user is Systems Engineer, Backend, Frontend, or Student
2. **Context-Aware Recommendations** - AI tailors suggestions to user's existing skill set
3. **4 Profile Page Variants** - Unique styling for each data source
4. **10k+ Real Profiles** - Actual LinkedIn/GitHub data for testing
5. **Interactive Roadmap** - Visual learning path with curated resources
6. **Hybrid Search** - Seamless fallback across multiple sources

---

## 📞 Support & Documentation

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Gemini API**: https://ai.google.dev/docs
- **Shadcn UI**: https://ui.shadcn.com

---

**Last Updated**: 2025-12-17  
**Version**: 1.0  
**Status**: ✅ Fully Functional (Demo-Ready)
