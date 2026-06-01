# IIMK Faculty CV Portal - AACSB Accreditation

## Overview
Automating the Faculty CV submission for AACSB Accreditation at IIM Kozhikode. The portal consolidates publications, consultancy, and academic activities from 2019–2025 into a standardized format.

**Deadline**: June 1, 2026  
**Portal**: https://webapps.iimk.ac.in/facultytemplatecv/Faculty/  
**Faculty**: Prof. Omkumar Krishnan (omkumar@iimk.ac.in)

---

## Portal Structure

### Key URLs
- **Login**: https://webapps.iimk.ac.in/facultytemplatecv/Faculty/Login
- **Dashboard**: https://webapps.iimk.ac.in/facultytemplatecv/Faculty/Dashboard
- **Publications/Entries**: https://webapps.iimk.ac.in/facultytemplatecv/Faculty/viewEntries

### Sections
1. **Personal Data** - Basic info
2. **Qualifications** - Education
3. **Experience** - Career history
4. **Administrative Positions Held**
5. **Awards/Honours/Certifications**
6. **Professional Memberships**
7. **Publications** ✅ (COMPLETED)
   - Articles (Journal)
   - Books
   - Conferences & Workshops
8. **Consultancy Projects**
9. **Research Grants**
10. **Research Interest**
11. **Other Relevant Info**
12. **Preview CV** - Final review before submission

---

## Completed Work

### Publications Added (May 31, 2026)
✅ **Publication 1 (Conference)**
- Title: "The Symbolic Self in the Age of Algorithms: Understanding and Designing for Existential Meaning Orientation in AI Personalization"
- Authors: Omkumar Krishnan, Sreejesh, S., Amritha
- Venue: AMA Winter Academic Conference
- Location: Madrid, Spain
- Date: February 13-15, 2026

✅ **Publication 2 (Journal)**
- Title: "Too smart to matter? The psychological meaning of cognitive labor in consumer resistance to AI"
- Authors: Omkumar Krishnan, Sreejesh, S., Shamim, I.
- Journal: Journal of Retailing and Consumer Services
- Volume: 87
- Pages: 104412
- Year: 2025

---

## Automation Scripts

### `add-publications.js`
**Purpose**: Automate login and publication entry addition to the portal.

**Usage**:
```powershell
npm install playwright -S
npx playwright install chromium
node add-publications.js
```

**What it does**:
1. Launches a browser
2. Navigates to login page
3. Logs in with credentials
4. Navigates to publications page
5. Fills and submits publication forms
6. Takes screenshots for verification

**Credentials** (stored in script):
- Email: omkumar@iimk.ac.in
- Password: Vilas83&24

**Output**:
- `publications-view.png` - View of publications page after login
- `publications-debug.png` - Debug info if form lookup fails

---

## Setup on New Machine

### Prerequisites
- Node.js installed
- Internet access to IIMK portal
- On IIMK network or VPN

### Steps
1. **Clone or copy the project** to the new machine
   ```powershell
   # If using git:
   git clone <repo-url> iimk-cv-work
   cd iimk-cv-work
   ```

2. **Install dependencies**
   ```powershell
   npm install playwright -S
   npx playwright install chromium
   ```

3. **Run the automation script**
   ```powershell
   node add-publications.js
   ```

4. **Verify the portal** in the opened browser
   - Check screenshots (`publications-view.png`)
   - Manually review the portal for correct entries
   - Continue with other CV sections as needed

---

## Next Steps

### Immediate (By June 1, 2026)
- [ ] Review Publications section - verify both entries added correctly
- [ ] Fill Conferences & Workshops section (if applicable, 2019–2025)
- [ ] Fill Consultancy Projects section (if applicable)
- [ ] Review Other Academic Activities
- [ ] Use "Preview CV" to check final format
- [ ] Submit the CV (generates PDF for AACSB)

### Optional Automation
Could extend `add-publications.js` to automate:
- Conferences & Workshops entry
- Consultancy projects entry
- Other sections (if data available)

---

## Key Information

### Portal Behavior
- Auto-redirects to login if session expires
- Maintains session across page navigations
- Form submission redirects back to entries list
- "Add Publication" button appears after each successful submission

### Form Fields (Publications)
- Title (text)
- Authors (text)
- Publication Type (dropdown: Journal, Conference, Book, etc.)
- Journal/Venue (text)
- Year (text)
- DOI/URL (text, optional)
- Volume/Issue/Pages (text)

### Pre-filled Data
The portal extracted details from Faculty Activity Reports for 2019–2025. Use the portal to:
1. Verify pre-filled entries are correct
2. Add missing publications
3. Update incorrect information
4. Delete duplicates if any

---

## Troubleshooting

### Script won't run
- **Error**: "Executable doesn't exist"
  - Fix: Run `npx playwright install chromium`

- **Error**: "Command not found (node)"
  - Fix: Install Node.js from nodejs.org

### Login fails
- **Error**: Redirects to login after filling form
  - Check: Ensure credentials are correct
  - Check: You're on IIMK network/VPN
  - Try: Manually log in first, then run script

### Form not filled
- **Error**: Script says "Found 0 form fields"
  - Check: Portal may have updated its HTML structure
  - Fix: Inspect the page and update selectors in script
  - Fallback: Fill forms manually using the portal UI

### Screenshots not saved
- Fix: Ensure write permissions in current directory
- Alternative: Check browser DevTools for page structure

---

## Files

```
C:\Users\omkii\
├── add-publications.js          # Main automation script
├── package.json                 # Node dependencies
├── package-lock.json            # Dependency lock file
├── CLAUDE.md                    # This file
├── publications-view.png        # Screenshot of portal after login
├── publications-debug.png       # Debug screenshot
└── node_modules/                # Installed packages
```

---

## Notes

- **Session Management**: Each run of the script starts a fresh browser session. If you want to continue from a previous session, manually access the portal instead.
- **Screen Capture**: The script uses headless: false, so you'll see a browser window open. This lets you verify form filling in real-time.
- **Multi-machine Sync**: Store this directory in cloud storage (OneDrive/Google Drive) or a git repository for access from other machines.

---

## Contact & Resources

- **Portal Support**: accreditation@iimk.ac.in
- **IIMK AACSB Accreditation**: https://webapps.iimk.ac.in/facultytemplatecv/
- **Deadline**: June 1, 2026

---

**Last Updated**: May 31, 2026  
**Status**: Publications section completed ✅
