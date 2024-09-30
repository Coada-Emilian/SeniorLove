# SeniorLove

## Overview

SeniorLove is a platform that fosters social connections among seniors through shared activities and hobbies. By promoting meaningful interactions, the platform helps older adults combat loneliness, engage in group events, and build lasting friendships.

## Technologies Used

### BackEnd:
- **Express**: For managing the API server and routing. An efficient framework mastered by the team, allowing for JavaScript-only coding.
- **EJS**: For server-side rendering of the admin page.
- **PostgreSQL**: A database server well-suited for CRUD operations.
- **Sequelize**: An ORM that simplifies data access, protects against SQL injections, and simplifies queries.

### FrontEnd:
- **React**: For dynamic page component rendering, providing a smoother user experience with a lighter site.
- **React Router**: For rendering different pages, promoting a consistent technology stack with minimal pages.
- **Tailwind**: For CSS styling.

### Code Management:
- **EsLint**: For syntax error checking (Airbnb style by Kevin).
- **Prettier**: For code indentation.
- **TypeScript**: For more robust code (React front end).
- **Joi**: For form field validation.

### Project Management:
- **GitHub Projects**: For direct integration with GitHub.

### Security:
- **Scrypt-node**: For securing user passwords (recommended by OWASP).
- **Cors**: To secure external API calls.
- **Sanitize**: To protect the server from user input and requests.
- **X-powered-by**: To remove technology information from server response headers.

### Browser Compatibility:
- Google Chrome
- Firefox


## Table of Contents
- [SeniorLove](#seniorlove)
  - [Overview](#overview)
  - [Technologies Used](#technologies-used)
    - [BackEnd:](#backend)
    - [FrontEnd:](#frontend)
    - [Code Management:](#code-management)
    - [Project Management:](#project-management)
    - [Security:](#security)
    - [Browser Compatibility:](#browser-compatibility)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Step 1: Clone the Repository](#step-1-clone-the-repository)
    - [Step 2: Navigate to the Project Directory](#step-2-navigate-to-the-project-directory)
    - [Step 3: Navigate to the Back-End Folder](#step-3-navigate-to-the-back-end-folder)
    - [Step 4: Install Dependencies](#step-4-install-dependencies)
    - [Step 5: Configure PostgreSQL Database](#step-5-configure-postgresql-database)
    - [Step 6: Set Up the Development Environment](#step-6-set-up-the-development-environment)
    - [Step 7: Set Up the PostgreSQL Database](#step-7-set-up-the-postgresql-database)
    - [Step 8: Set Up Cloudinary for Image Uploads](#step-8-set-up-cloudinary-for-image-uploads)
    - [Step 9: Configure the Environment Variables](#step-9-configure-the-environment-variables)
    - [Step 10: Start the Back-End Server](#step-10-start-the-back-end-server)
    - [Step 11: Set Up the Front-End Portion](#step-11-set-up-the-front-end-portion)
    - [Step 12: Install Front-End Dependencies](#step-12-install-front-end-dependencies)
    - [Step 13: Compile Tailwind CSS](#step-13-compile-tailwind-css)
    - [Step 14: Configure the Front-End Environment Variables](#step-14-configure-the-front-end-environment-variables)
    - [Step 15: Start the Front-End Development Server](#step-15-start-the-front-end-development-server)
  - [Features](#features)
  - [Usage](#usage)

## Installation

To set up and run SeniorLove locally, follow these steps:

### Step 1: Clone the Repository

To get started, you need to clone the SeniorLove repository from GitHub.

```bash
git clone https://github.com/Coada-Emilian/SeniorLove.git
``` 

### Step 2: Navigate to the Project Directory

Once the repository is cloned, navigate to the project folder on your local machine:

```bash
cd DIRECTORYPATH/
``` 

Replace DIRECTORYPATH with the actual path where you cloned the project.


### Step 3: Navigate to the Back-End Folder

Next, navigate to the back-end folder to begin setting up the server:

```bash
cd seniorLove-back_end
```

This folder contains the server-side code and configurations for the project.


### Step 4: Install Dependencies

After navigating to the back-end folder, install the necessary dependencies by running the following command:

```bash
npm install
```

Alternatively, if you're using pnpm:
```bash
pnpm install
```

This will install all the required packages for the back-end.


### Step 5: Configure PostgreSQL Database

Set up the PostgreSQL database by following these steps:

1. Connect to PostgreSQL as a superuser (usually the `postgres` user) via the command line:

   ```bash
   psql -U postgres
   ``` 
2. Create new user with password:
   ```sql
   CREATE USER username WITH PASSWORD 'password';
   ``` 
3. Create a database owned by the user:
   ```sql
   CREATE DATABASE databaseName OWNER username;
   ```

Make sure to replace username and databaseName with your desired values.

### Step 6: Set Up the Development Environment

To set the `NODE_ENV` environment variable, use the following commands based on your operating system:

- **For Windows**:
   ```bash
   $env:NODE_ENV = 'development'
   ```
- **For macOS/Linux:**
  ```bash
  export NODE_ENV=development
  ```

### Step 7: Set Up the PostgreSQL Database

Initialize the database by running the following commands to create the necessary tables and populate them with test data:

1. Run the table creation script inside `package.json`:

   ```bash
   npm run prestart
   ```

    Alternatively, if you're using pnpm:
   ```bash
   pnpm prestart
   ```

2. Create tables and populate them with test data:
   ```bash
   npm run db:reset
   ```

   Alternatively, if you're using pnpm:
   ```bash
   pnpm db:reset
   ```

This sets up your database structure and prepares it for use with the application.

### Step 8: Set Up Cloudinary for Image Uploads

To enable image uploads, you will need a free Cloudinary account. You can create one by following this link:

[Create a Free Cloudinary Account](https://cloudinary.com/users/register_free)

After creating your account, you will obtain your Cloudinary credentials.

### Step 9: Configure the Environment Variables

After creating your Cloudinary account, set up a **.env** file in the back-end folder. This file should be similar to the **.env.example** file provided in the repository.

Make sure to include your Cloudinary credentials, which you can find on the Cloudinary website, in the **.env** file.

### Step 10: Start the Back-End Server

Once your database is set up and your environment variables are configured, you can start the back-end server with the following command:

```bash
npm run dev
```

Alternatively, if you're using pnpm:
```bash
pnpm run dev
```

This will launch the back-end server and make it ready to handle requests. It will also make the admin portion accessible in your web browser, typically at http://localhost:4000/admin

### Step 11: Set Up the Front-End Portion

After the back-end server is up and running, navigate to the front-end folder:

```bash
cd ..
cd seniorLove-front_end
```
This folder contains the client-side code for the application.

### Step 12: Install Front-End Dependencies

In the front-end directory, install the necessary dependencies using the following command:

```bash
npm install
```
Or if you're using pnpm:
```bash
pnpm install
```
This will set up all the required packages for the front-end portion of the project.

### Step 13: Compile Tailwind CSS

This project uses Tailwind CSS for styling. To compile Tailwind CSS with live updates, run the following command every time you open VSCode:

```bash
npx tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css --watch
```

This will ensure that your Tailwind styles are applied as you make changes to your components.

### Step 14: Configure the Front-End Environment Variables

Before starting the front-end server, create a **.env** file in the front-end directory. This file should contain any necessary environment variables specific to the client-side application.

For example, you might include your API URL or other relevant settings. Make sure to follow the structure of any provided **.env.example** files as a guide.


### Step 15: Start the Front-End Development Server

To run the front-end development server, use the following command in the front-end directory:

```bash
npm start
```

Or if you're using pnpm:

```bash
pnpm start
```

This command will start the client-side application and make it accessible in your web browser, typically at http://localhost:3000.

## Features

- **User Profiles**: Seniors can create user profiles, which are pending validation by the admin before they become active.
- **Event Participation**: Users can browse and participate in events tailored for seniors.
- **Messaging System**: Seniors can send messages to each other to foster connections and friendships.
- **Photo Uploads**: Users can upload photos to share their experiences with others.
- **Admin Controls**: Admins have the ability to validate user profiles and create events for seniors to join.

## Usage

Once the application is running, you can:
- **Create an Account**: Sign up to start connecting with other seniors. Your profile will be pending validation by an admin before it becomes active.
- **Browse Events**: Explore various events tailored for seniors and participate in those that interest you.
- **Send Messages**: Use the messaging feature to communicate with other seniors and foster connections.
- **Upload Photos**: Share your experiences by uploading photos to your profile.
- **Admin Actions**: If you are an admin, you can validate user profiles and create new events for seniors to join.
