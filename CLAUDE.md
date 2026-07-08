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

---

# MM Teaching Agent - IIM Kozhikode MBA

## Overview
AI-powered teaching assistant for Marketing Management (MM) course coordination and content development. Helps generate case discussions, design session activities, and create assignments with rubrics.

**Course**: Marketing Management (Term 1)  
**Sections**: A & B (PGP 30)  
**Instructor**: Prof. Omkumar Krishnan  
**Materials**: [Google Drive](https://drive.google.com/drive/folders/13xx0trMSrow5mjyWeKUyZFqej5bVX4Lo)

---

## How to Invoke

Use in Claude Code when you need teaching support:

**For Case Discussion Questions:**
```
MM-Teach: Generate discussion questions for [case name]
```

**For Session Activity Planning:**
```
MM-Teach: Design session activity for [topic/week]
```

**For Assignment Design:**
```
MM-Teach: Create assignment on [topic] with grading rubric
```

---

## Course Materials & Topics

### Available Cases
- The Accra Beach Hotel (Strategic positioning, pricing, market analysis)
- New cases (see Google Docs folder)

### Course Structure
- **Term 1**: 7-8 weeks (Jan-Mar 2026)
- **Sections**: A & B (PGP 30 students each)
- **Format**: Case-based seminars + concept lectures
- **Reference**: MM Intro presentation, MM Term 1 syllabus

### Key MBA Marketing Topics
- Strategic Marketing Planning
- Consumer Behavior & Market Analysis
- Product & Brand Management
- Pricing Strategy
- Distribution & Channel Management
- Integrated Marketing Communication
- Digital Marketing
- Marketing Analytics

---

## Templates & Workflows

### 1. Case Discussion Questions Generator

**Input**: Case name + focus area (optional)

**Output**: Structured discussion questions (8-10)
- Opening questions (context, company background)
- Analytical questions (problems, opportunities)
- Strategic questions (recommendations, implementation)
- Reflection questions (learning takeaways)

**Example Prompt**:
```
MM-Teach: Case discussion for Accra Beach Hotel
Focus: Strategic positioning and pricing strategy
Format: 10 questions for 90-minute seminar
```

### 2. Session Activity Planner

**Input**: Topic + session duration + class size

**Output**: Structured activity plan
- Opening activity (10-15 min)
- Core activity (40-50 min)
- Closure/reflection (15-20 min)
- Materials needed
- Grouping recommendations

**Example Prompt**:
```
MM-Teach: Design session activity for Consumer Behavior
Duration: 90 minutes
Activity type: Interactive case analysis + group debate
```

### 3. Assignment Designer with Rubric

**Input**: Topic + assignment type + difficulty level

**Output**: Complete assignment
- Objectives & learning outcomes
- Instructions (clear, detailed)
- Deliverables (format, length)
- Grading rubric (5-7 criteria, 4-5 levels each)
- Submission guidelines
- Resources/references

**Example Prompt**:
```
MM-Teach: Create assignment for Integrated Marketing Communication
Type: Strategic campaign proposal
Level: MBA (challenging, real-world context)
```

### 4. Teaching Note + Board Plan + Framework Deck Generator

**Input**: Case study (PDF/text) + focus area + course placement

**Output**: A coordinated instructor packet saved in one case folder:
- **Teaching Note (.docx)** — discussion questions (opening → analytical → strategic → reflection), synopsis, learning objectives, minute-by-minute plan, board plan, recommended landing, student takeaways
- **Case Panel Notes** — appended "PART C": panel-by-panel explanation of the board plan, each with a short "what this board does" paragraph + `Takeaways:` bullets
- **Board Plan (.pptx)** — populate `Boardplan template 2026.pptx` (16:9; 3-col × 2-row = six panels + "Case Title" box). Typical flow: **1 Decision/Context → 2 Debate/Stakeholders → 3 Options → 4 Data/Evidence → 5 Frameworks → 6 Landing/Recommendation**. Save as a NEW file (never overwrite the template); mirror the grid as a `Table Grid` at the end of the note
- **Framework Explainer Deck (.pptx)** — one slide per framework (Porter, Kotler, Ansoff, segmentation, positioning, etc.): numbered header band, *Core question* strip, THE FRAMEWORK / IN THE CASE / DECISION IMPLICATION; plus title, overview, synthesis slides

**House style**: brand navy `#1F3864`; teaching-note PART headers 15pt bold, sub-headers 12pt bold, `List Bullet` bullets. Build with `python-docx`/`python-pptx` via `C:\Users\MSI\AppData\Local\Python\bin\python.exe`.

**Reference exemplar**: `C:\Users\MSI\Desktop\Case 3 MAAS  Salesbot\` (built for the MAAS course; the same workflow and template apply to MM cases such as Accra Beach Hotel).

**Example Prompt**:
```
MM-Teach: Build teaching note + board plan + framework deck for Accra Beach Hotel
Focus: strategic positioning and pricing
Board template: Boardplan template 2026.pptx
```

---

## Quick Reference Commands

| Task | Command |
|------|---------|
| Case discussion questions | `MM-Teach: Case [name] + discussion` |
| Board plan + note + deck | `MM-Teach: Board plan + teaching note for [case]` |
| Session activities | `MM-Teach: Session plan for [topic]` |
| Assignment & rubric | `MM-Teach: Assignment on [topic]` |
| Discussion framework | `MM-Teach: Discussion framework for [concept]` |
| Group project template | `MM-Teach: Group project on [topic]` |
| Exam questions | `MM-Teach: Exam questions for [module]` |

---

## Integration with Course Materials

### Reference Materials Available
- **MM Intro 2026** (presentation): Course overview, expectations, schedule
- **MM Term 1 Syllabus**: Learning outcomes, topics, assessment criteria
- **Case Studies**: Accra Beach Hotel + new cases in Google Docs
- **Prof. Omkumar Profile**: Research interests, teaching philosophy (if relevant)

### How the Agent Uses Materials
1. Aligns questions with course syllabus learning outcomes
2. Incorporates case studies for real-world application
3. Matches difficulty level to MBA standards (analytical, strategic thinking)
4. References current marketing trends and frameworks

---

## Assessment Guidelines for Agent

### Discussion Questions Should:
- Require critical thinking and analysis
- Connect to strategic business decisions
- Use frameworks (Porter, Kotler, Ansoff, etc.) where relevant
- Progress from comprehension → analysis → application

### Activities Should:
- Engage 30+ students in 90-min sessions
- Mix individual reflection, pair/group work, class discussion
- Include real-world application or case analysis
- Encourage peer learning and debate

### Assignments Should:
- Align with course learning outcomes
- Be feasible within time constraints
- Include grading rubric with clear criteria
- Offer variety (individual, group, presentation, written)

---

## Session Planning Checklist

When planning a session, ask the agent to provide:
- [ ] Discussion questions (8-10 structured questions)
- [ ] Opening activity (5-10 min ice-breaker/engagement)
- [ ] Core activity (case analysis or debate structure)
- [ ] Group work instructions (if applicable)
- [ ] Closure/reflection prompt
- [ ] Resources needed (slides, handouts, videos)
- [ ] Time allocation (minute-by-minute)

---

## Tips for Best Results

1. **Be Specific**: Provide case names, topics, duration, learning objectives
2. **Specify Level**: MBA level expects strategic, analytical depth
3. **Mention Constraints**: Class size (30-40), time available, student background
4. **Request Format**: Prefer structured tables, bullet points, or narrative as needed
5. **Link to Learning**: Reference course syllabus objectives for alignment

---

## Notes

- Agent draws from MBA marketing best practices and IIM Kozhikode teaching context
- All materials are aligned with course syllabus and AACSB standards
- Agent can generate discussion variants for same case (different focus areas, difficulty levels)
- For student-facing materials, always review and adapt as needed before distribution

**Last Updated**: July 8, 2026  
**Status**: MM Teaching Agent created ✅ · added Board Plan + Teaching Note + Framework Deck generator (Template #4)
