# OSINT-Hive: Comprehensive Project Report

**Date**: 2025-12-18
**Status**: Production-Ready / Vercel-Compatible

---

## 📖 Introduction
**OSINT-Hive** is an advanced career intelligence platform. It "hacks" the job market by treating career growth like an intelligence operation.
It aggregates data from **LinkedIn**, **GitHub**, and **Google** to build a comprehensive profile of "Hero Mentors" in your target role. It then uses **Google Gemini AI** to compare *your* skills against theirs, identifying gaps and creating a localized "Recovery Plan" to bridge them.

---

## 📂 Project Structure: Where & Why?

This project follows the **Next.js App Router** architecture, widely considered the modern standard for React applications. Here is exactly where everything lives and **why** it is there.

### 1. `src/app/` (The Application)
**Why here?** In Next.js, the heavily routed pages live here. Folders become URL paths.
*   `page.tsx`: The home page (Landing).
*   `layout.tsx`: Wraps every page (Navigation, Fonts, Metadata).
*   `dashboard/page.tsx`: The main user interface (`/dashboard`).
*   `search/page.tsx`: The search engine interface (`/search`).
*   `api/`: Backend logic. These files run on the server (Serverless Functions) to handle data safely without exposing keys to the browser.

### 2. `src/components/` (Building Blocks)
**Why here?** To keep code reusable. Instead of writing a button code 50 times, we write it once here and import it.
*   `ui/`: The "Design System" (Shadcn UI). Buttons, inputs, modals, cards. Reliable, accessible base blocks.
*   `dashboard/`: Custom widgets just for the dashboard (e.g., `CommandCenter.tsx`).
*   `interactive-roadmap.tsx`: The visual flowchart component.

### 3. `src/lib/` (The Brain)
**Why here?** This is the "Business Logic". It contains the complex thinking code, separated from the UI code.
*   `gap-analysis-ai.ts`: **The Core AI Engine**. Decides if a user is a "Frontend Dev" or "Systems Engineer" and writes the advice.
*   `linkedin-search.ts`: Logic to read and filter the 10,000+ LinkedIn text records.
*   `github-data.ts`: Logic to parse the GitHub CSV dataset.
*   `gemini.ts`: Standardized connection to Google's AI.

### 4. `src/data/` (Deployment Data) **[CRITICAL]**
**Why here?** These are the **active** datasets used by the live website.
*   **Why split from DATA-SETS?** The original datasets were huge (>100MB) and broke GitHub uploads.
*   `linkedin-data.txt`: A 45MB optimized subset (approx 3,500 profiles) that fits on GitHub/Vercel.
*   `github-users.csv`: The clean 2.3MB GitHub dataset.
*   **How it works**: When you deploy to Vercel, *this* folder is uploaded, ensuring the app has data to search.

### 5. `DATA-SETS/` (Raw Archives)
**Why here?** This is your **local warehouse**.
*   Contains the massive source files (100MB+ `10k_data_li_india.txt`).
*   **Ignored by Git**: These are NOT uploaded to GitHub to prevent errors.
*   **Usage**: You keep them here for backup or if you want to generate new subsets for `src/data`.

### 6. `public/` (Static Assets)
**Why here?** Files here are served directly to the browser.
*   `OSINT_HIVE.svg`: The project logo.

---

## ⚙️ How Things Work: The Flows

### 🔍 1. The Hybrid Search Engine
**Goal**: Find a mentor profile from *anywhere*.
**Flow**:
1.  User types "React Developer".
2.  App checks **Internal Mock DB** (Fastest).
3.  If no results, it checks **LinkedIn Dataset** (`src/data/linkedin-data.txt`).
4.  Then checks **GitHub Dataset** (`src/data/github-users.csv`).
5.  **Fallback**: If still nothing, it uses **Google Custom Search API** to "dork" real-time internet results (OSINT).

### 🧠 2. The Gap Analysis (AI)
**Goal**: Tell the user what they are missing.
**Flow**:
1.  User Profile (Skills: HTML, CSS) vs Target Profile (Skills: HTML, CSS, React, AWS).
2.  **Heuristic Engine** (`gap-analysis-ai.ts`):
    *   Sees "HTML/CSS" -> Infers "Frontend Beginner".
    *   Sees missing "React" -> Knows this is critical for 2025.
3.  **AI Generation**:
    *   Sends context to Gemini AI.
    *   Gemini writes a personalized "Recovery Plan" (e.g., "Stop using jQuery, learn React hooks").
4.  **Result**: Displayed as a "Gap Report" with specific resource links.

### 🚀 3. Deployment (Vercel)
**Goal**: Get the app online.
**Flow**:
1.  You push code to GitHub.
2.  GitHub notifies Vercel.
3.  Vercel downloads the code (including `src/data`).
4.  Vercel ignores `.env.local` (Secrets).
5.  Vercel builds the app (`npm run build`).
    *   *Note: We fixed a bug here where the Search page failed to build.*
6.  The site goes live!

---

## 🛠 Technical Stack
*   **Next.js 16**: The framework. Handles routing and server rendering.
*   **TypeScript**: The language. Prevents bugs by ensuring data types (e.g., ensuring a "User" always has a "Name").
*   **Tailwind CSS**: The styling. Makes it look "Cyberpunk" and professional.
*   **Supabase**: The database. Stores user logins and saved profiles.
*   **Gemini AI**: The intelligence.
