# Thunder Tube

Welcome to Thunder Tube! This project is a YouTube clone designed to replicate core features of YouTube, such as video subscriptions, likes, playlists, comments, channel profiles, and more. Thunder Tube is built using modern web technologies including React.js, Node.js, HTML, CSS, JavaScript, and MongoDB.

Try it out at - [https://thunder-tube.vercel.app/](https://thunder-tube.vercel.app/)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User Registration and Login (JWT Authentication)
- Video Upload and Playback
- Subscribe to Channels
- Like and Dislike Videos
- Create and Manage Playlists
- Comment on Videos
- View Channel Profiles

## Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com//thunder-tube.git
    ```

2. Navigate to the project directory:
    ```sh
    cd thunder-tube
    ```

3. Install dependencies for both frontend and backend:
    ```sh
    npm install
    cd client
    npm install
    cd ..
    ```

4. Set up environment variables by creating a `.env` file in the root directory and adding the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

5. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

- Navigate to `http://localhost:3000` in your web browser.
- Register a new account or log in with an existing account.
- Explore features like uploading videos, subscribing to channels, creating playlists, and more.

## API Endpoints

### Auth

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login a user

### Videos

- **GET /api/videos** - Get all videos
- **POST /api/videos** - Upload a new video
- **GET /api/videos/:id** - Get a video by ID

### Comments

- **GET /api/videos/:videoId/comments** - Get comments for a video
- **POST /api/videos/:videoId/comments** - Add a comment to a video

### Playlists

- **GET /api/playlists** - Get all playlists
- **POST /api/playlists** - Create a new playlist
- **GET /api/playlists/:id** - Get a playlist by ID

### Subscriptions

- **POST /api/subscriptions/:channelId** - Subscribe to a channel
- **DELETE /api/subscriptions/:channelId** - Unsubscribe from a channel

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Parag Ghatage - [thunderwolf.dev@gmail.com](mailto:thunderwolf.dev@gmail.com)

Project Link: [https://github.com/ParagGhatage/Thunder-Tube](https://github.com/ParagGhatage/Thunder-Tube)
