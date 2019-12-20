const fs = require('fs');
const readline = require('readline');
const { GoogleToken } = require('gtoken');
const {
    google
} = require('googleapis');

const SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/admin.directory.user',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.labels',
    'https://www.googleapis.com/auth/gmail.metadata'
];
const TOKEN_PATH = 'token_gsuite.json';

getNewToken()

function getNewToken() {
    
    const gtoken = new GoogleToken({
        keyFile: './credentials_gsuite.json',
        scope: SCOPES // or space-delimited string of scopes
    });
      
    gtoken.getToken((err, tokens) => {
        
        if (err) {
          console.log(err);
          return;
        }
        storeToken(tokens);
    });

}

function storeToken(token) {
    fs.writeFile('token.txt', `${token.token_type} ${token.access_token}`, (err) => {
        if (err) return console.warn(`Token not stored to 'token.txt'`, err);
        console.log(`Token stored to 'token.txt'`);
    });
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.warn(`Token not stored to ${TOKEN_PATH}`, err);
        console.log(`Token stored to ${TOKEN_PATH}`);
    });
}

module.exports = {
    SCOPES,
    getNewToken,
};