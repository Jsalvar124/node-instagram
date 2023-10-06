# Instagram Image Poster

A Node.js application for posting images to Instagram using the Instagram Private API. This project is designed to automate the process of posting images to your Instagram account at specified intervals.

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Setting up Environment Variables](#setting-up-environment-variables)
  - [Configuring the `images.js` File](#configuring-the-imagesjs-file)
  - [Understanding `currentIndex` in Gist](#understanding-currentindex-in-gist)
- [Vercel Deployment Configuration](#vercel-deployment-configuration)
- [Usage](#usage)

## Features

- Automatically posts images to your Instagram account at scheduled times.
- Supports remote image URLs for posting.
- Retrieves and updates the posting index from a remote source, such as a GitHub Gist, to ensure that images are not posted repeatedly.
- Easily configurable using environment variables.
- CORS (Cross-Origin Resource Sharing) support for handling remote requests.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- Instagram account credentials (username and password).
- GitHub account (for storing and updating the posting index).

## Installation

1. Clone this repository to your local machine:
```
git clone https://github.com/Jsalvar124/node-instagram.git
```
2. Navigate to the project directory:
```
cd node-instagram
```
3. Install the project dependencies:
```
cd node-instagram
```
npm install

## Configuration

### setting-up-environment-variables
To configure the application, create a `.env` file in the root directory of the project and set the following environment variables:

- `IG_USERNAME`: Your Instagram username.
- `IG_PASSWORD`: Your Instagram password.
- `GH_TOKEN`: Your GitHub personal access token.
- `GH_GISTID`: The ID of the GitHub Gist where the posting index is stored.

### configuring-the-imagesjs-file

The `images.js` file is an essential component of the project. It contains an array of image URLs that you want to post to your Instagram account. Each URL in the array points to an image you want to publish as an Instagram post. I uploaded all my posts into a free imgur account <a>https://imgur.com/</a>. imgur provides a nice tool to generate the URLs for all selected images.

Here's what the `images.js` file typically looks like:

```javascript
const images = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  // Add more image URLs as needed
];

module.exports = images;
```

### understanding-currentindex-in-gist

In your project, you're using a GitHub Gist to store and manage a piece of shared data named `currentIndex`. Let's break down what `currentIndex` represents and why it's important:

- `currentIndex` is a simple numeric value that keeps track of the index of the last image posted to Instagram. It essentially tells your application which image from your `images` array should be posted next.

- In your Gist, it's structured as an object with the key `currentIndex`, like this: `{ currentIndex: 3 }`. The value (in this example, `3`) indicates that the last image posted had an index of `3` in your `images` array.

- The `currentIndex` is crucial because it ensures that your application doesn't repost the same image repeatedly. After each successful Instagram post, you increment the `currentIndex` by 1, which means the next time your application runs, it will select the next image in the array.

- By storing this `currentIndex` value in a GitHub Gist, you make it accessible and shareable across different executions of your application. This is particularly useful if your application runs on different servers or devices, as they can all read and update the same `currentIndex` value in the Gist.

- It's also a convenient way to persist this data without needing a server or database. GitHub Gists offer a lightweight and free method to store and synchronize simple data across multiple instances of your application.

Overall, the `currentIndex` in your Gist serves as a marker for your application to keep track of its progress in posting images to Instagram, preventing duplicates and ensuring that each image is posted only once.

### vercel-deployment-configuration

The cron job for scheduled Instagram posts is already set up in the `vercel.json` file. Here's what the cron configuration in `vercel.json` looks like:

```json
"crons": [
  {
    "schedule": "0 18 * * *",
    "path": "/api/cron"
  }
]
```
This configuration schedules the /api/cron endpoint to run every day at 6:00 PM (18:00 UTC, which is 13:00 in Colombia). You can adjust the cron schedule according to your preferences by modifying the "schedule" value in the vercel.json file. Keep in mind that Vercel allows up to 3 free projects, and 2 cronJobs per project that can be triggered once per day. 


## Usage

To start the application, run the following command:

```
npm start
```

The application will begin posting images to your Instagram account at scheduled intervals and you should see the respective logs on the vercel dashboard after each post.

