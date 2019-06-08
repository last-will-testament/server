'use strict';

const {google} = require('googleapis');
const sampleClient = require('./sampleclient');

const gmail = google.gmail({
  version: 'v1',
  auth: sampleClient.oAuth2Client,
});

async function runSample() {
  // You can use UTF-8 encoding for the subject using the method below.
  // You can also just use a plain string if you don't need anything fancy.
  const subject = 'Status Check';
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    'From: Living Dead <duanshu.translations@gmail.com>',
    'To: Linden Chiu <linden1023@hotmail.com>',
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    'Are you alive?',
    'Reply to this e-mail.',
  ];
  const message = messageParts.join('\n');

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'duanshu.translations@gmail.com>',
    requestBody: {
      raw: encodedMessage,
    },
  });
  console.log(res.data);
  return res.data;
}

const scopes = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send',
];

if (module === require.main) {
  sampleClient
    .authenticate(scopes)
    .then(runSample)
    .catch(console.error);
}

function testSubscription() {
  gmail.users.watch({
    userId: "duanshu.translations@gmail.com",
    resource: {
        topicName: "projects/dead-or-alive-243118/topics/Linden",
        labelIds: ["INBOX"]
    }
});
}



module.exports = {
  runSample,
  testSubscription,
  client: sampleClient.oAuth2Client,
};