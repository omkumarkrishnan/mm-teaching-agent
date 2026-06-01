const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const TOKEN_PATH = path.join(__dirname, 'token.json');

async function accessFolder(folderId) {
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/oauth2callback'
  );
  oauth2Client.setCredentials(token);

  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  // Get folder info
  const folderInfo = await drive.files.get({
    fileId: folderId,
    fields: 'name, id, webViewLink',
  });

  console.log(`\n📂 ${folderInfo.data.name}`);
  console.log(`🔗 Link: ${folderInfo.data.webViewLink}\n`);

  // List contents
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    spaces: 'drive',
    fields: 'files(id, name, mimeType, modifiedTime, size)',
    pageSize: 100,
  });

  const files = res.data.files || [];
  console.log(`Contains ${files.length} item(s):\n`);
  files.forEach((file, index) => {
    const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
    const icon = isFolder ? '📁' : '📄';
    console.log(`${index + 1}. ${icon} ${file.name}`);
    if (file.size) {
      console.log(`   Size: ${(file.size / 1024).toFixed(2)} KB`);
    }
  });
}

const folderId = process.argv[2] || '1GkBKqOf3euwFmn4-1UDUA0NOnk1H27gx';
accessFolder(folderId).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
