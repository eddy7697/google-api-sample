const fs = require('fs');
const {
    google
} = require('googleapis');
const {auth} = require('google-auth-library');

const SCOPES = [
    'https://www.googleapis.com/auth/cloud-platform',
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/admin.directory.user',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.labels',
    'https://www.googleapis.com/auth/gmail.metadata'
];



// fs.readFile('credentials_gsuite.json', (err, content) => {
//     if (err) return console.error('Error loading client secret file', err);

//     authorize(JSON.parse(content), listUsers);
// });

async function main() {
    // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
    // environment variables.
    // const auth = new google.auth.GoogleAuth({
    //     keyFile: './credentials_gsuite.json',
    //     scopes: SCOPES
    // });
    // const authClient = await auth.getClient();

    // const gmail = google.gmail({
    //     version: 'v1',
    //     auth: authClient
    // });

    // console.log(gmail);

    // gmail.users.labels.list({
    //     userId: 'me'
    // }, (err, res) => {
    //     console.log(err);
    //     console.log(res);

    // })


    // gmail.users.labels.create({
    //     "userId": "kiki.ho@dev.hkmci.com",
    //     "resource": {
    //         "labelListVisibility": "labelShow",
    //         "messageListVisibility": "show",
    //         "name": "TESTTEST"
    //     }
    // }, (err, res) => {
    //     if (err) return console.log('The API returned an error: ' + err);
    //     console.log(res)
    // });
    // gmail.users.labels.list({
    //     userId: 'me',
    // }, (err, res) => {
    //     if (err) return console.log(err);
    //     const labels = res.data.labels;
    //     if (labels.length) {
    //         console.log('Labels:');
    //         labels.forEach((label) => {
    //             console.log(`- ${label.name}`);
    //         });
    //     } else {
    //         console.log('No labels found.');
    //     }
    // });

    // console.log(authClient);


    // const res = await compute.zones.list({
    //     project,
    //     auth: authClient
    // });
    // console.log(res.data);

    // return;
    fs.readFile('credentials_gsuite.json', (err, token) => {
        const cred = JSON.parse(token)
        // console.log(cred.client_email);
        // console.log(cred.private_key);
        // console.log(cred.customer_email);

        // return


        // const keysEnvVar = cred;
        // if (!keysEnvVar) {
        //     throw new Error('The $CREDS environment variable was not found!');
        // }
        // const keys = cred;

        // async function main() {
        //     // load the JWT or UserRefreshClient from the keys
        //     const client = auth.fromJSON(keys);
        //     client.scopes = SCOPES;
        //     const url = `https://www.googleapis.com/gmail/v1/users/me/labels?key=AIzaSyCBU7wJCKemgodB95TWYVOEdqeTrGOdKkE`;
        //     const res = await client.request({
        //         url
        //     });
        //     console.log(res.data);
        // }

        // main().catch(console.error);
        // return

        const JWTClient = new google.auth.JWT(
            cred.client_email,
            null,
            cred.private_key,
            SCOPES,
            'eddy.li@dev.hkmci.com'
        );

        JWTClient.authorize(function (err, token) {
            if (err) {
                console.log(err.message);
                return
                // Not Authorized
            }
            // console.log(token);
            fs.writeFile('token_gsuite.json', JSON.stringify(token), (err) => {
                if (err) return console.warn(`Token not stored to 'token_gsuite.json'`, err);
                console.log(`Token stored to 'token_gsuite.json'`);
            });
        });
    });


}

main().catch(console.error);