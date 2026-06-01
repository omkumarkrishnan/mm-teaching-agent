const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const TOKEN_PATH = path.join(__dirname, 'token.json');
const FOLDER_NAME = 'IIMK CV Portal';

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

async function getOrCreateFolder(drive) {
  try {
    // Search for existing folder
    const res = await drive.files.list({
      q: `name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name)',
      pageSize: 1,
    });

    if (res.data.files.length > 0) {
      console.log(`✅ Found existing folder: ${FOLDER_NAME}`);
      return res.data.files[0].id;
    }

    // Create new folder
    const folderRes = await drive.files.create({
      resource: {
        name: FOLDER_NAME,
        mimeType: 'application/vnd.google-apps.folder',
      },
      fields: 'id',
    });

    console.log(`📁 Created new folder: ${FOLDER_NAME}`);
    return folderRes.data.id;
  } catch (err) {
    console.error('❌ Error with folder:', err);
    throw err;
  }
}

async function uploadFile(drive, filePath, folderId) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return null;
  }

  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath);

  try {
    const res = await drive.files.create({
      resource: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        body: fileContent,
      },
      fields: 'id, webViewLink',
    });

    console.log(`✅ Uploaded: ${fileName}`);
    console.log(`   Link: ${res.data.webViewLink}`);
    return res.data.id;
  } catch (err) {
    console.error(`❌ Failed to upload ${fileName}:`, err.message);
    return null;
  }
}

async function uploadMultipleFiles(filePaths) {
  try {
    const auth = await authenticate();
    const drive = google.drive({ version: 'v3', auth });

    console.log('🚀 Google Drive Upload\n');

    const folderId = await getOrCreateFolder(drive);

    console.log(`\n📤 Uploading ${filePaths.length} file(s)...\n`);

    for (const filePath of filePaths) {
      await uploadFile(drive, filePath, folderId);
    }

    console.log('\n✅ All files uploaded!');
    console.log(`📂 Folder link: https://drive.google.com/drive/folders/${folderId}`);
  } catch (err) {
    console.error('❌ Upload failed:', err);
    process.exit(1);
  }
}

// CLI: Allow running with file arguments
// Usage: node upload-to-drive.js file1.png file2.pdf ...
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Default: upload screenshots and debug files
    const defaultFiles = [
      'publications-view.png',
      'publications-debug.png',
    ].filter(f => fs.existsSync(f));

    if (defaultFiles.length > 0) {
      uploadMultipleFiles(defaultFiles);
    } else {
      console.log('Usage: node upload-to-drive.js <file1> <file2> ...');
      console.log('Example: node upload-to-drive.js publications-view.png cv-data.json');
    }
  } else {
    uploadMultipleFiles(args);
  }
}

module.exports = { uploadMultipleFiles, uploadFile, authenticate, getOrCreateFolder };
