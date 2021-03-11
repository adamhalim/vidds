import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'
import SQLiteAccountHandler from './SQLiteAccountHandler'

const app = express();
app.use(cors());
const port = 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})

const accountHandler = new SQLiteAccountHandler();
accountHandler.initDB();

// Test URLS used for development
const urls = [
    'https://i.imgur.com/cLrwJFi.jpg',
    'https://i.imgur.com/cLrwJFi.jpg',
    'https://i.imgur.com/cLrwJFi.jpg',
    'https://i.imgur.com/cLrwJFi.jpg',
    'https://i.imgur.com/cLrwJFi.jpg',
    'https://i.imgur.com/cLrwJFi.jpg',
    'https://i.imgur.com/cLrwJFi.jpg',
    'https://i.imgur.com/cLrwJFi.jpg',
]

/**
 * Decode a JWT token to get the user's google profile
 * @param token Token
 * @returns Google profile
 */
const decodeToken = async (token: string) => {
    const res = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
    const data = await res.json();
    return data;
}

// Return all thumbnails for a user.
// Should expect a token here.
app.get('/getThumbnails', async (req, res) => {
    const token = await decodeToken(req?.headers?.token as string);
    // Check if account exists here. If no, create new one.
    accountHandler.accountRegistered(token);

    res.send(urls);
})