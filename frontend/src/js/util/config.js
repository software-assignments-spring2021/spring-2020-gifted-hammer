const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = "ceb63cf56e694c949fde58196aa88f37";
const redirectUri = "http://localhost:3000/callback";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read",
  "streaming", 
  "user-read-email", 
  "user-read-private",
  "user-read-recently-played"
];


export {authEndpoint, clientId, redirectUri, scopes}