# URL Shortener Service

A simple RESTful API built with Node.js, Express, and MongoDB for creating, retrieving, updating, and deleting shortened URLs, as well as tracking access statistics.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [API Endpoints](#api-endpoints)
8. [Testing with Postman](#testing-with-postman)
9. [Error Handling](#error-handling)
10. [Next Steps](#next-steps)
11. [License](#license)

---

## Overview

This service allows users to:

- **Create** a new short URL for a given original URL.
- **Retrieve** the original URL and increment its access count.
- **Update** an existing short URL's destination.
- **Delete** a short URL mapping.
- **Get statistics** including creation date, update date, and total access count.

All data is persisted in MongoDB to ensure durability across server restarts.

---

## Tech Stack

- **Node.js** (JavaScript runtime)
- **Express** (Web framework)
- **MongoDB** (NoSQL database)
- **Mongoose** (MongoDB ODM)
- **NanoID** (Unique ID generator for short codes)
- **dotenv** (Environment variable management)
- **cors** (Cross-Origin Resource Sharing)

---

## Prerequisites

- **Node.js** (v14+)
- **npm** (v6+)
- **MongoDB** (running locally or a connection URI)

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/url-shortener-js.git
   cd url-shortener-js
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/url_shortener
BASE_URL=http://localhost:3000
```

- `PORT` – Port the server listens on (default: 3000)
- `MONGODB_URI` – MongoDB connection string
- `BASE_URL` – Base URL for generating full short URLs

---

## Running the Application

Start the server:

```bash
npm start
```

You should see:
```
🚀 Server running at http://localhost:3000
```

---

## API Endpoints

### 1. Create Short URL

- **Endpoint:** `POST /shorten`
- **Body:**
  ```json
  { "url": "https://www.example.com/long/path" }
  ```
- **Response (201):**
  ```json
  {
    "id": "<MongoID>",
    "url": "https://www.example.com/long/path",
    "shortCode": "abc123",
    "createdAt": "2025-04-21T10:00:00.000Z",
    "updatedAt": "2025-04-21T10:00:00.000Z",
    "shortUrl": "http://localhost:3000/abc123"
  }
  ```

### 2. Retrieve Original URL

- **Endpoint:** `GET /shorten/:code`
- **Response (200):**
  ```json
  {
    "id": "<MongoID>",
    "url": "https://www.example.com/long/path",
    "shortCode": "abc123",
    "createdAt": "2025-04-21T10:00:00.000Z",
    "updatedAt": "2025-04-21T10:00:00.000Z",
    "accessCount": 1
  }
  ```

### 3. Update Short URL

- **Endpoint:** `PUT /shorten/:code`
- **Body:**
  ```json
  { "url": "https://www.example.com/new-path" }
  ```
- **Response (200):** Updated document with new `url` and `updatedAt`.

### 4. Delete Short URL

- **Endpoint:** `DELETE /shorten/:code`
- **Response (204):** No content.

### 5. Get URL Statistics

- **Endpoint:** `GET /shorten/:code/stats`
- **Response (200):** Same as retrieve but includes `accessCount`.

---

## Testing with Postman

1. **Manual Requests:**
   - Open Postman, create requests for each endpoint using the examples above.
   - For `POST /shorten`, copy the returned `shortCode`.
   - Use that code in your subsequent `GET`, `PUT`, `DELETE`, and `/stats` requests.

2. **Collection Runner (Bulk):**
   - Prepare a CSV of URLs:
     ```csv
     url
     https://site1.com/foo
     https://site2.com/bar
     ```
   - In Postman, set `{{url}}` in the request body and run the collection with your CSV.

---

## Error Handling

- **400 Bad Request:** Missing or invalid body parameters.
- **404 Not Found:** Invalid `shortCode` for GET/PUT/DELETE.
- **500 Internal Server Error:** Database connection issues or unexpected failures.

---


## License

This project is licensed under the [MIT License](LICENSE).

