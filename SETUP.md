# Claude Code OmK - Universal Setup Guide

This repository contains automation scripts for Google Drive, Gmail, and IIMK CV Portal.

## Universal Access Setup (Any Computer)

### Prerequisites
- Node.js installed
- Git installed
- GitHub account with access to `Claude_Code_omk` repo

### First-Time Setup (Any Machine)

1. **Clone the repository**
   ```powershell
   git clone https://github.com/omkii/Claude_Code_omk.git
   cd Claude_Code_omk
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Set up credentials**
   ```powershell
   # Copy the example .env file
   Copy-Item .env.example .env
   
   # Edit .env with your Google credentials
   notepad .env
   ```
   Add your Google OAuth credentials:
   ```
   GOOGLE_CLIENT_ID=1090775245504-tdbsq29qfj1rona67cl8j952ukra5cuq.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   ```

4. **Authenticate**
   - First run: `node authenticate-gmail.js`
   - Authorizes and saves `token.json` (auto-synced if in cloud)
   - Future runs use saved token automatically

### Available Scripts

**Google Drive:**
```powershell
node access-folder.js [folder-id]      # Access folders
node list-folders.js                   # List all folders
node list-folders.js search <term>     # Search folders
node upload-to-drive.js <file1> <file2> # Upload files
```

**Gmail:**
```powershell
node read-emails.js                    # List inbox (10 emails)
node read-emails.js unread             # List unread
node read-emails.js from <name>        # Emails from person
node read-emails.js search <term>      # Search emails
node read-emails.js read <id>          # Read full email
```

**CV Portal:**
```powershell
node add-publications.js                # Auto-add publications
```

### Cloud Sync (Optional - Recommended)

To sync `token.json` across machines:

1. **Store in OneDrive/Google Drive:**
   - Place this repo in OneDrive/GDrive folder
   - `token.json` syncs automatically

2. **Or use GitHub (Private repo):**
   - Create a private `tokens` branch
   - Instructions: (Coming soon)

### Security Notes

⚠️ **Important:**
- `.env` contains API credentials - **NEVER commit to public repos**
- `token.json` is in `.gitignore` - local only per machine
- Each machine gets its own OAuth token
- Credentials are encrypted at rest by dotenv

### Troubleshooting

**"token.json not found"**
- Run: `node authenticate-gmail.js`
- Authorize in browser
- Token saves automatically

**"Gmail API not enabled"**
- Go to: https://console.developers.google.com/apis/
- Search for "Gmail API"
- Click "Enable"
- Wait 1-2 minutes

**"Command not found (node)"**
- Install Node.js from nodejs.org
- Restart terminal

---

**Last Updated:** 2026-06-01  
**Repository:** https://github.com/omkii/Claude_Code_omk
