
Music Streaming App

A full-stack MERN (MongoDB, Express, React, Node.js) application for streaming music, creating playlists, liking songs, and leaving comments. Styled with Tailwind CSS.

Features

User Authentication: Register and log in using JWT-based authentication.

Music Library: View, search (by title, artist, album), and stream songs (audio and YouTube embeds).

Playlist Management: Create, view, expand, delete playlists; add/remove songs.



Comments: Leave comments on songs; comments persist for the session.

Responsive UI: Tailwind CSS styling for a clean, modern look.

Technology Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express, MongoDB (Atlas)

Authentication: JWT (jsonwebtoken)

Deployment: Netlify (frontend), Render (backend)



API Endpoints

Auth

POST /api/auth/register → Register new user

POST /api/auth/login → Login, returns { token, username }

Songs

GET /api/songs → List all songs

POST /api/songs → Add a new song (auth)

PUT /api/songs/:id → Update song (auth)

DELETE /api/songs/:id → Delete a song (auth)



Playlists

GET /api/playlists → List user’s playlists (auth)

POST /api/playlists → Create a playlist (auth)

POST /api/playlists/:id/add → Add song to playlist (auth)

POST /api/playlists/:id/remove → Remove song (auth)

DELETE /api/playlists/:id → Delete playlist (auth)

Functionality:
The Music Streaming App offers a seamless experience for discovering and enjoying music: users can explore
a personalized library of recommended tracks and popular albums, search across titles, artists, or albums, and play high‑quality 
audio or embedded YouTube videos with intuitive controls such as play, pause, shuffle, repeat, and volume adjustment.
They can curate their own collections by creating, renaming, and deleting playlists, as well as adding or removing songs with ease.
Engagement features include liking individual tracks—and leaving comments to share thoughts. 
Additionally, users can download songs for offline listening when needed and share favorite tracks or playlists on social media to connect with friends.



