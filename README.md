# OSINT-Hive 🕵️‍♂️🐝

**AI-Powered Open Source Intelligence & Career Roadmap Engine**

OSINT-Hive is a Next.js application that leverages Open Source Intelligence (OSINT) to aggregate professional profiles from LinkedIn, GitHub, and other public sources. It uses Google's Gemini AI to analyze these profiles, identify skill gaps, and generate personalized career learning paths.

Deployed Link - https://osint-hive.vercel.app/

> **📘 Comprehensive Documentation**
> For a deep dive into the project structure, architecture, file locations, and inner workings, please read the **[Full Project Report](./report.md)**.


![OSINT-Hive Logo](/public/OSINT_HIVE.svg)

## 🚀 Features

*   **Hybrid Search Engine**: Searches internal database, LinkedIn (dataset), GitHub (dataset), and live Google OSINT.
*   **AI Gap Analysis**: Compares your skills against a target role/mentor and generates a recovery plan.
*   **Interactive Roadmaps**: Visual learning paths with curated resources.
*   **Profile Intelligence**: Detailed analysis of 10k+ profiles with experience timelines and skill matrices.
*   **Resume Parser**: Drag-and-drop resume analysis using Gemini AI.

## 🛠️ Tech Stack

*   **Framework**: Next.js 16 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS 4, Radix UI, Framer Motion
*   **Database**: Supabase
*   **AI**: Google Gemini Pro 1.5
*   **Data Viz**: D3.js

## 📦 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/osint-hive.git
    cd osint-hive
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Copy `.env.example` to `.env.local` and fill in your keys:
    ```bash
    cp .env.example .env.local
    ```
    *   `GOOGLE_API_KEY`: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
    *   `GOOGLE_SEARCH_API_KEY` & `CX`: Get from [Google Programmable Search](https://programmablesearchengine.google.com/)
    *   `NEXT_PUBLIC_SUPABASE_URL` & `ANON_KEY`: Get from [Supabase](https://supabase.com/)

4.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment

### Deploy to Vercel

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  **Critical**: Add your Environment Variables in the Vercel Project Settings during import.
    *   `GOOGLE_API_KEY`
    *   `GOOGLE_SEARCH_API_KEY`
    *   `GOOGLE_SEARCH_CX`
    *   `NEXT_PUBLIC_SUPABASE_URL`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4.  Click **Deploy**.

### Security Note

The `.env.local` file is gitignored to protect your secrets. **Never** commit this file to GitHub. Always set these variables in your deployment platform's settings.

## 📂 Project Structure

*   `src/app`: App Router pages and API routes
*   `src/components`: UI components (Shadcn/Radix)
*   `src/lib`: Logic for AI, Search, and Data parsing
*   `DATA-SETS`: Local datasets for LinkedIn/GitHub (gitignored in prod usually, but included here for demo)
