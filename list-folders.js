const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const TOKEN_PATH = path.join(__dirname, 'token.json');

async function authenticate() {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ token.json not found. Run "node authenticate-drive.js" first.');
  }

  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/oauth2callback'
  );
  oauth2Client.setCredentials(token);
  return oauth2Client;
}

async function listAllFolders() {
  try {
    const auth = await authenticate();
    const drive = google.drive({ version: 'v3', auth });

    console.log('📂 Searching for all folders in your Google Drive...\n');

    let allFolders = [];
    let pageToken = null;

    do {
      const res = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
        spaces: 'drive',
        fields: 'files(id, name, createdTime, modifiedTime), nextPageToken',
        pageSize: 100,
        pageToken: pageToken,
      });

      allFolders = allFolders.concat(res.data.files || []);
      pageToken = res.data.nextPageToken;
    } while (pageToken);

    console.log(`Found ${allFolders.length} folders:\n`);
    allFolders.forEach((folder, index) => {
      console.log(`${index + 1}. ${folder.name}`);
      console.log(`   ID: ${folder.id}`);
      console.log(`   Modified: ${new Date(folder.modifiedTime).toLocaleDateString()}\n`);
    });

    return allFolders;
  } catch (err) {
    console.error('❌ Error listing folders:', err);
    process.exit(1);
  }
}

async function searchFolder(searchTerm) {
  try {
    const auth = await authenticate();
    const drive = google.drive({ version: 'v3', auth });

    console.log(`🔍 Searching for folders matching: "${searchTerm}"\n`);

    const res = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name contains '${searchTerm}' and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name, createdTime, modifiedTime)',
      pageSize: 20,
    });

    const folders = res.data.files || [];

    if (folders.length === 0) {
      console.log(`❌ No folders found matching "${searchTerm}"`);
      return null;
    }

    console.log(`Found ${folders.length} matching folder(s):\n`);
    folders.forEach((folder, index) => {
      console.log(`${index + 1}. ${folder.name}`);
      console.log(`   ID: ${folder.id}`);
      console.log(`   Modified: ${new Date(folder.modifiedTime).toLocaleDateString()}\n`);
    });

    return folders;
  } catch (err) {
    console.error('❌ Error searching folders:', err);
    process.exit(1);
  }
}

async function listFolderContents(folderId) {
  try {
    const auth = await authenticate();
    const drive = google.drive({ version: 'v3', auth });

    const folderInfo = await drive.files.get({
      fileId: folderId,
      fields: 'name, id, webViewLink',
    });

    console.log(`\n📂 Contents of: ${folderInfo.data.name}\n`);
    console.log(`🔗 Link: ${folderInfo.data.webViewLink}\n`);

    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name, mimeType, modifiedTime, size)',
      pageSize: 100,
    });

    const files = res.data.files || [];

    if (files.length === 0) {
      console.log('(empty folder)');
      return;
    }

    console.log(`Contains ${files.length} item(s):\n`);
    files.forEach((file, index) => {
      const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
      const icon = isFolder ? '📁' : '📄';
      console.log(`${index + 1}. ${icon} ${file.name}`);
      if (file.size) {
        console.log(`   Size: ${(file.size / 1024).toFixed(2)} KB`);
      }
    });
  } catch (err) {
    console.error('❌ Error listing folder contents:', err);
    process.exit(1);
  }
}

// CLI
(async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // List all folders
    await listAllFolders();
  } else if (args[0] === 'search' && args[1]) {
    // Search for specific folder
    await searchFolder(args.slice(1).join(' '));
  } else if (args[0].length === 25) {
    // Assume it's a folder ID
    await listFolderContents(args[0]);
  } else {
    // Search by name
    const searchTerm = args.join(' ');
    const folders = await searchFolder(searchTerm);
    if (folders && folders.length === 1) {
      await listFolderContents(folders[0].id);
    }
  }
})();
