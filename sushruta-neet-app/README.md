# Sushruta — NEET Preparation App

A premium, production-quality NEET preparation mobile-first web application built with Next.js, TypeScript, Tailwind CSS, and Firebase.

---

## Overview

Sushruta helps NEET medical aspirants track their preparation journey with a rich, data-driven Profile page, statistics, study preferences, notification management, and goal setting.

Named after **Sushruta** — the ancient Indian physician and father of surgery.

---

## Features

- ✅ Firebase Authentication (email/password + Google)
- ✅ Firestore real-time database
- ✅ Firestore security rules (user-only access)
- ✅ Profile CRUD (name, role, initials)
- ✅ Motivational quote editor
- ✅ NEET goal editor (exam, year, target rank/score)
- ✅ Statistics grid (6 metrics, all from Firestore)
- ✅ Study preferences settings
- ✅ Notification preferences settings
- ✅ Appearance settings (light/dark/system)
- ✅ Download Manager
- ✅ Help & Support with FAQ
- ✅ About Sushruta page
- ✅ Sign out
- ✅ Fixed bottom navigation (5 tabs)
- ✅ Loading skeleton states
- ✅ Toast notifications
- ✅ Responsive mobile + desktop layout
- ✅ Registration auto-seeds Firestore with default data

---

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | Next.js 14 (App Router)           |
| Language    | TypeScript                        |
| Styling     | Tailwind CSS                      |
| Icons       | Lucide React                      |
| Auth        | Firebase Authentication           |
| Database    | Cloud Firestore                   |
| Hosting     | Vercel (recommended)              |

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx               # Root layout + AuthProvider
│   ├── page.tsx                 # Redirect to /profile or /login
│   ├── login/page.tsx           # Login page
│   ├── register/page.tsx        # Registration page
│   ├── profile/page.tsx         # ⭐ Main Profile page
│   ├── home/page.tsx            # Home tab
│   ├── study/page.tsx           # Study tab
│   ├── practice/page.tsx        # Practice tab
│   ├── bookmarks/page.tsx       # Bookmarks tab
│   └── settings/
│       ├── study-preferences/   # Study prefs settings
│       ├── notifications/       # Notification settings
│       ├── appearance/          # Appearance settings
│       ├── downloads/           # Download manager
│       ├── help/                # Help & Support
│       └── about/               # About Sushruta
│
├── components/
│   ├── profile/
│   │   ├── ProfileHeader.tsx
│   │   ├── ProfileAvatar.tsx
│   │   ├── QuoteCard.tsx
│   │   ├── GoalCard.tsx
│   │   ├── StatsGrid.tsx
│   │   ├── StatCard.tsx
│   │   ├── ProfileSettingsList.tsx
│   │   ├── ProfileSettingsItem.tsx
│   │   └── SignOutButton.tsx
│   ├── navigation/
│   │   └── BottomNavigation.tsx
│   └── ui/
│       ├── Modal.tsx
│       ├── Skeleton.tsx
│       └── Toast.tsx
│
├── contexts/
│   └── AuthContext.tsx          # Global auth state
│
├── lib/
│   └── firebase/
│       ├── config.ts            # Firebase initialization
│       ├── auth.ts              # Auth helpers
│       └── firestore.ts         # Firestore CRUD helpers
│
├── services/
│   ├── profileService.ts        # Profile Firestore operations
│   ├── statsService.ts          # Stats Firestore operations
│   └── preferencesService.ts   # Preferences Firestore operations
│
└── types/
    ├── profile.ts               # UserProfile types
    ├── stats.ts                 # ProfileStats types
    └── preferences.ts           # Preferences types
```

---

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project**
3. Name it `sushruta-neet` (or any name)
4. Disable Google Analytics (optional)
5. Click **Create project**

### 2. Enable Authentication

1. In Firebase Console → **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** (optional but recommended)

### 3. Create Firestore Database

1. In Firebase Console → **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode**
4. Select your nearest region

### 4. Apply Security Rules

In Firestore → **Rules**, paste the contents of `firestore.rules`:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /stats/{document} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /preferences/{document} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 5. Get Firebase Config

1. In Firebase Console → **Project Settings** → **Your apps**
2. Click **Add app** → **Web**
3. Register app (any nickname)
4. Copy the `firebaseConfig` object values

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Firebase values:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## Firestore Schema

```
users/{userId}
├── displayName: string
├── email: string
├── avatarInitials: string  (max 2 chars, e.g. "SD")
├── role: string            (e.g. "NEET Aspirant")
├── quote: string
├── goal: {
│   ├── exam: string        (e.g. "NEET")
│   ├── year: number        (e.g. 2026)
│   ├── targetScore?: number
│   └── targetRank?: number
│   }
├── appearance: "light" | "dark" | "system"
├── createdAt: Timestamp
└── updatedAt: Timestamp

users/{userId}/stats/profile
├── topicsCompleted: number
├── totalStudyMinutes: number   (stored as minutes, displayed as hrs)
├── averageAccuracy: number     (0-100)
├── mockTestsTaken: number
├── achievements: number
└── syllabusCovered: number     (0-100)

users/{userId}/preferences/study
├── dailyStudyMinutes: number
├── preferredSubjects: string[]
├── difficulty: "easy" | "medium" | "hard"
├── preferredStartTime: string  (HH:MM)
└── remindersEnabled: boolean

users/{userId}/preferences/notifications
├── studyReminders: boolean
├── mockTestReminders: boolean
├── dailyMotivation: boolean
└── achievementNotifications: boolean
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**First time setup:**
1. Go to `/register`
2. Create an account with name, email, and password
3. You'll be automatically redirected to `/profile`
4. All default data (stats, preferences) is seeded on registration

---

## Production Build

```bash
npm run build
npm start
```

---

## Deployment (Vercel — Recommended)

1. Push to GitHub
2. Go to [Vercel](https://vercel.com) → Import project
3. Add all environment variables from `.env.local`
4. Deploy

---

## Default Seed Data

On registration, these defaults are created:

| Field           | Default Value                    |
|----------------|----------------------------------|
| Role           | NEET Aspirant                    |
| Quote          | Discipline today, Doctor tomorrow. |
| Goal           | NEET 2026                        |
| Topics Completed | 372                            |
| Study Time     | 148 hrs (8880 minutes)           |
| Average Accuracy | 78%                            |
| Mock Tests     | 32                               |
| Achievements   | 6                                |
| Syllabus       | 68%                              |

---

## License

MIT © 2026 Sushruta
