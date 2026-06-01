const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/gmail.readonly',
];
const TOKEN_PATH = path.join(__dirname, 'token.json');

async function authenticate() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/oauth2callback'
  );

  // Check if we already have a saved token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    oauth2Client.setCredentials(token);
    console.log('✅ Using existing token from token.json');
    console.log('   Scopes: Google Drive + Gmail');
    return oauth2Client;
  }

  // Get new token
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    login_hint: 'omkumar@iimk.ac.in',
  });

  console.log('🔐 Authorize this app by visiting this url:');
  console.log(authUrl);
  console.log('\n⏳ Waiting for authorization...\n');

  // Simple HTTP server to catch the callback
  const http = require('http');

  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      if (req.url.startsWith('/oauth2callback')) {
        const url = new URL(req.url, 'http://localhost:3000');
        const code = url.searchParams.get('code');

        if (code) {
          try {
            const { tokens } = await oauth2Client.getToken(code);
            oauth2Client.setCredentials(tokens);

            // Save token for future use
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
            console.log('✅ Token saved to token.json');
            console.log('   Scopes: Google Drive + Gmail');

            res.writeHead(200);
            res.end('Authorization successful! You can close this window.');
            server.close();
            resolve(oauth2Client);
          } catch (err) {
            console.error('❌ Failed to get token:', err);
            res.writeHead(400);
            res.end('Authorization failed');
            server.close();
            reject(err);
          }
        } else {
          res.writeHead(400);
          res.end('No code received');
          server.close();
          reject(new Error('No authorization code'));
        }
      }
    });

    server.listen(3000, () => {
      console.log('🌐 Callback server listening on http://localhost:3000');
    });

    server.on('error', (err) => {
      console.error('❌ Server error:', err);
      reject(err);
    });
  });
}

async function testGmailAccess() {
  const auth = await authenticate();
  const gmail = google.gmail({ version: 'v1', auth });

  try {
    const profile = await gmail.users.getProfile({
      userId: 'me',
    });

    console.log('\n📧 Gmail Account Info:');
    console.log(`   Email: ${profile.data.emailAddress}`);
    console.log(`   Total messages: ${profile.data.messagesTotal}`);
    console.log(`   Unread messages: ${profile.data.messagesUnread}`);

    console.log('\n✅ Successfully authenticated with Gmail!');
  } catch (err) {
    console.error('❌ Error accessing Gmail:', err);
    throw err;
  }
}

// Main
(async () => {
  try {
    console.log('🚀 Google Drive + Gmail Authentication\n');
    await testGmailAccess();
  } catch (err) {
    console.error('❌ Authentication failed:', err);
    process.exit(1);
  }
})();
