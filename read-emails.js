const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const TOKEN_PATH = path.join(__dirname, 'token.json');

async function authenticate() {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ token.json not found. Run "node authenticate-gmail.js" first.');
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

async function listEmails(query = '', limit = 10) {
  try {
    const auth = await authenticate();
    const gmail = google.gmail({ version: 'v1', auth });

    console.log(`\n📧 Fetching emails${query ? ` (query: ${query})` : ''}...\n`);

    const res = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: limit,
    });

    const messages = res.data.messages || [];

    if (messages.length === 0) {
      console.log('No emails found.');
      return;
    }

    console.log(`Found ${messages.length} email(s):\n`);

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const msgData = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'metadata',
        metadataHeaders: ['From', 'To', 'Subject', 'Date'],
      });

      const headers = msgData.data.payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || '(no subject)';
      const from = headers.find(h => h.name === 'From')?.value || '(no sender)';
      const date = headers.find(h => h.name === 'Date')?.value || '(no date)';

      console.log(`${i + 1}. ${subject}`);
      console.log(`   From: ${from}`);
      console.log(`   Date: ${date}`);
      console.log(`   ID: ${msg.id}\n`);
    }

    return messages;
  } catch (err) {
    console.error('❌ Error fetching emails:', err.message);
    process.exit(1);
  }
}

async function readEmail(messageId) {
  try {
    const auth = await authenticate();
    const gmail = google.gmail({ version: 'v1', auth });

    const msgData = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'full',
    });

    const headers = msgData.data.payload.headers;
    const subject = headers.find(h => h.name === 'Subject')?.value || '(no subject)';
    const from = headers.find(h => h.name === 'From')?.value || '(no sender)';
    const to = headers.find(h => h.name === 'To')?.value || '(no recipient)';
    const date = headers.find(h => h.name === 'Date')?.value || '(no date)';

    console.log(`\n📧 Email Details\n`);
    console.log(`Subject: ${subject}`);
    console.log(`From: ${from}`);
    console.log(`To: ${to}`);
    console.log(`Date: ${date}`);
    console.log(`\n─────────────────\n`);

    // Get body
    let body = '';
    if (msgData.data.payload.parts) {
      for (const part of msgData.data.payload.parts) {
        if (part.mimeType === 'text/plain' || part.mimeType === 'text/html') {
          body = Buffer.from(part.body.data, 'base64').toString('utf-8');
          break;
        }
      }
    } else if (msgData.data.payload.body.data) {
      body = Buffer.from(msgData.data.payload.body.data, 'base64').toString('utf-8');
    }

    console.log(body.substring(0, 500) + (body.length > 500 ? '...' : ''));
  } catch (err) {
    console.error('❌ Error reading email:', err.message);
    process.exit(1);
  }
}

// CLI
const args = process.argv.slice(2);

if (args.length === 0) {
  // List inbox
  listEmails('', 10);
} else if (args[0] === 'search' && args[1]) {
  // Search
  listEmails(args.slice(1).join(' '), 20);
} else if (args[0] === 'read' && args[1]) {
  // Read specific email
  readEmail(args[1]);
} else if (args[0] === 'unread') {
  // Unread emails
  listEmails('is:unread', 20);
} else if (args[0] === 'from' && args[1]) {
  // Emails from specific sender
  listEmails(`from:${args.slice(1).join(' ')}`, 20);
} else {
  console.log('Usage:');
  console.log('  node read-emails.js              - List inbox (10 emails)');
  console.log('  node read-emails.js unread       - List unread emails');
  console.log('  node read-emails.js from <name>  - List emails from <name>');
  console.log('  node read-emails.js search <term> - Search emails');
  console.log('  node read-emails.js read <id>    - Read full email');
}
