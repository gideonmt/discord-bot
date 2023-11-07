## THIS BOT IS A WORK IN PROGRESS

# Discord Bot

This is a general purpose Discord bot designed for all types of communities. 

## Features

- Unique moderation features.
- A collection of fun commands. 
- Many handy utilities.

## Dependencies

- [discord.js v14](https://discord.js.org/#/): The Discord.js library is used to interact with the Discord API.

## Installation and Usage

To use this Discord bot, follow these simple steps:

### 1. Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your system.
- Make sure to use [pnpm](https://pnpm.io/) as the package manager.

### 2. Bot Setup

1. Clone this repository to your local machine or download it as a ZIP archive.
2. Create a `.env` file in the project directory. You can use the provided `.env.example` as a template. Fill in your bot's token and ID.

   ```
   TOKEN=YOU_BOT_TOKEN
   CLIENT_ID=YOU_CLIENT_ID

   # API KEYS
   NASA_API_KEY=YOUR_NASA_API_KEY # Create one at https://api.nasa.gov/ or leave blank to use the demo key.
   ```

If you don't have a bot token or client ID yet, you can follow the steps in the [Creating a Discord Bot Application](#creating-a-discord-bot-application) section to create a bot application and obtain the necessary token and client ID.

3. Install the required dependencies by running the following command in your terminal:

   ```bash
   pnpm install
   ```

4. Initialize the Database

   ```bash
   node functions/db/init.js
   ```

This script will set up the necessary database tables. If you ever make changes to the database models, you can use the --force or -f option to force synchronization of the tables. Be cautious when using this option as it will empty and recreate the model tables. This will delete all the data you previously had stored. 

### 3. Deploy and Run

- To deploy or reset the bot's commands, run the following command:

  ```bash
  node deploy-commands.js
  ```

- To start the bot, run:

  ```bash
  node index.js
  ```

### 4. Invite the Bot to Your Server

#### Creating a Discord Bot Application 
Before you can invite your Discord bot, you'll need to create a Bot Application on the Discord Developer Portal and enable all the necessary intents. If you have already done that you can skip this step. Here are the steps:

1. Visit the [Discord Developer Portal](https://discord.com/developers/applications).

2. Click on the "New Application" button.

3. Give your application a name.

4. Navigate to the "Bot" section in the left sidebar.

7. Scroll down to the "Privileged Gateway Intents" section.

8. Enable all the intents under this section. These intents are required for various features of the bot. To enable these intents, simply toggle the switches to the "ON" position.

9. Save your changes.

#### Inviting the bot

Invite the bot to your server by using the following link, replacing `<YOUR_CLIENT_ID>` with your bot's client ID:
   
   ```
   https://discord.com/api/oauth2/authorize?client_id=<YOUR_CLIENT_ID>&permissions=8&scope=bot%20applications.commands
   ```

Once the bot is in your server, you can start using its features and commands.

## Configuring the bot 
WIP

## Contributing

This Discord bot is a work in progress. Pull requests and issues are very appreciated. 