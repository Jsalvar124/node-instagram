# Instagram Image Poster

A Node.js application for posting images to Instagram using the Instagram Private API. This project is designed to automate the process of posting images to your Instagram account at specified intervals.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

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

