## THIS BOT IS A WORK IN PROGRESS

# Discord Bot

This is a general purpose Discord bot designed for all types of communities. 

## Features

- Unique moderation features.
- A collection of fun commands. 
- Many handy utilities.

## Dependencies

- [discord.js v14](https://discord.js.org/#/): The Discord.js library is used to interact with the Discord API, allowing the bot to send and receive messages, as well as perform other actions on your server.

## Installation and Usage

To use this Discord bot, follow these simple steps:

### 1. Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your system.
- Make sure to use [pnpm](https://pnpm.io/) as the package manager.

### 2. Bot Setup

1. Clone this repository to your local machine or download it as a ZIP archive.
2. Create a `.env` file in the project directory. You can use the provided `.env.example` as a template. Fill in your bot's token and ID.

   ```
   DISCORD_TOKEN=your_token_here
   DISCORD_CLIENT_ID=your_client_id_here
   ```

3. Install the required dependencies by running the following command in your terminal:

   ```bash
   pnpm install
   ```

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

Invite the bot to your server by using the following link, replacing `<YOUR_CLIENT_ID>` with your bot's client ID:
   
   ```
   https://discord.com/oauth2/authorize?client_id=<YOUR_CLIENT_ID>&scope=bot&permissions=8
   ```

Once the bot is in your server, you can start using its features and commands.

## Contributing

This Discord bot is a work in progress. Pull requests and issues are very appreciated. 