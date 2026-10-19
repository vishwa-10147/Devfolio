<# 
.SYNOPSIS
    Starts the Devfolio development server with automatic dependency installation.
    
.DESCRIPTION
    This script checks for Node.js, installs dependencies if needed, and starts the Next.js dev server.
    Can be run by double-clicking or from PowerShell.
    
.EXAMPLE
    .\start-dev.ps1
#>

param(
    [switch]$Install,
    [switch]$Build,
    [switch]$Production
)

# Set execution policy for this session if needed
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Colors for output
$Green = [ConsoleColor]::Green
$Yellow = [ConsoleColor]::Yellow
$Red = [ConsoleColor]::Red
$Cyan = [ConsoleColor]::Cyan
$Gray = [ConsoleColor]::DarkGray

function Write-Colored($message, $color = $Gray) {
    Write-Host $message -ForegroundColor $color
}

function Write-Header($message) {
    Write-Colored ("=" * 50) $Cyan
    Write-Colored "  $message" $Cyan
    Write-Colored ("=" * 50) $Cyan
    Write-Host ""
}

function Check-NodeJS {
    try {
        $nodeVersion = node --version
        $npmVersion = npm --version
        Write-Colored "✓ Node.js: $nodeVersion" $Green
        Write-Colored "✓ npm: $npmVersion" $Green
        return $true
    } catch {
        Write-Colored "✗ Node.js not found!" $Red
        Write-Colored "Please install Node.js from https://nodejs.org/" $Yellow
        return $false
    }
}

function Install-Dependencies {
    Write-Colored "Installing dependencies..." $Yellow
    try {
        npm install
        Write-Colored "✓ Dependencies installed successfully!" $Green
        return $true
    } catch {
        Write-Colored "✗ Failed to install dependencies" $Red
        return $false
    }
}

function Start-DevServer {
    Write-Colored "Starting development server..." $Yellow
    Write-Colored "The app will be available at: http://localhost:3000" $Cyan
    Write-Colored "Press Ctrl+C to stop the server" $Gray
    Write-Host ""
    
    try {
        npm run dev
    } catch {
        Write-Colored "Server stopped." $Yellow
    }
}

function Start-Production {
    Write-Colored "Building for production..." $Yellow
    try {
        npm run build
        Write-Colored "✓ Build successful!" $Green
    } catch {
        Write-Colored "✗ Build failed" $Red
        return
    }
    
    Write-Colored "Starting production server..." $Yellow
    Write-Colored "The app will be available at: http://localhost:3000" $Cyan
    Write-Host ""
    
    try {
        npm start
    } catch {
        Write-Colored "Server stopped." $Yellow
    }
}

# Main execution
Write-Header "Devfolio - Portfolio Application"

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Colored "ERROR: package.json not found!" $Red
    Write-Colored "Please run this script from the Devfolio project root directory." $Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check Node.js
if (-not (Check-NodeJS)) {
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Handle parameters
if ($Build -or $Production) {
    Start-Production
} else {
    # Check and install dependencies if needed
    if ($Install -or (-not (Test-Path "node_modules"))) {
        if (-not (Install-Dependencies)) {
            Read-Host "Press Enter to exit"
            exit 1
        }
        Write-Host ""
    }
    
    Start-DevServer
}

Write-Host ""
Read-Host "Press Enter to exit"