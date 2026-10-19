# Devfolio - Quick Start Guide

## 🚀 One-Click Start Options

### Option 1: Batch File (Simplest - Double Click)
**File:** `start-dev.bat`

Just double-click `start-dev.bat` - it will:
1. Check if dependencies are installed (runs `npm install` on first run)
2. Start the development server at `http://localhost:3000`
3. Show the server output in the console window

### Option 2: PowerShell Script (Advanced - Right Click → Run with PowerShell)
**File:** `start-dev.ps1`

Right-click `start-dev.ps1` → **Run with PowerShell** for more features:
- Better error handling and colored output
- Automatic Node.js version checking
- Additional commands available:

```powershell
# Normal development start
.\start-dev.ps1

# Force reinstall dependencies
.\start-dev.ps1 -Install

# Build and run production server
.\start-dev.ps1 -Build

# Run production server (after build)
.\start-dev.ps1 -Production
```

## 🔧 Prerequisites

1. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
2. **Git** (optional) - For version control

## 📁 Project Structure

```
Devfolio/
├── start-dev.bat       ← Double-click this for quick start
├── start-dev.ps1       ← Right-click → "Run with PowerShell"
├── package.json
├── .env.example        ← Copy to .env.local and add your GitHub username
└── ...
```

## ⚙️ First-Time Setup

1. **Copy environment file:**
   ```bash
   copy .env.example .env.local
   ```

2. **Edit `.env.local` and add your GitHub username:**
   ```env
   GITHUB_USERNAME=your-github-username
   
   # Optional: For higher API rate limits
   GITHUB_TOKEN=ghp_xxxxxxxxxxxx
   ```

3. **Run the app:**
   - Double-click `start-dev.bat` OR
   - Right-click `start-dev.ps1` → "Run with PowerShell"

## 🌐 Access the App

Once started, open your browser to:
- **Development:** http://localhost:3000
- **Production:** http://localhost:3000 (after running with `-Build`)

## 🛑 Stop the Server

Press `Ctrl+C` in the console window, or simply close the window.

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "npm not recognized" | Install Node.js from nodejs.org and restart terminal |
| Port 3000 in use | The script will auto-switch to 3001, 3002, etc. |
| GitHub API errors | Add `GITHUB_TOKEN` to `.env.local` for higher rate limits |
| Permission denied (PowerShell) | Run PowerShell as Administrator once: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` |

## 📝 Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |
| `npm test` | Run Vitest tests |

---

**Need help?** Check the main `README.md` for full documentation.