# Melodify
Melodify is a music playlist management application that allows users to create, manage, and play their favorite playlists.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create and manage playlists
- Add and remove songs from playlists
- Play songs directly from the application
- User authentication and profile management

## Installation

To get started with Melodify, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/melodify.git
    ```

2. Navigate to the project directory:
    ```bash
    cd melodify
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

## Usage

Once the development server is running, you can access the application in your web browser at `http://localhost:3000`.

### Sidebar Component

The Sidebar component is used to display the list of playlists. It accepts the following props:

- `onSelectPlaylist`: A function that is called when a playlist is selected. The function receives the playlist ID as an argument.


