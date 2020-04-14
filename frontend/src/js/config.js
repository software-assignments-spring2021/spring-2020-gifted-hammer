const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = "3a0ca7b16e144325b0d16335076aae72";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read",
  "streaming", 
  "user-read-email", 
  "user-read-private"
];


export {authEndpoint, clientId, redirectUri, scopes}