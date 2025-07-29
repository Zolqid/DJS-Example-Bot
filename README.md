# DJS-Example-Bot

A modern, modular Discord bot built with [Discord.js v14](https://discord.js.org/) using **ESM modules**.  
Supports **slash commands**, **context menu commands**, and **prefix-based commands** for maximum flexibility.

---

## Features

- ⚡ Built with latest Discord.js v14 and Node.js ESM support  
- 🛠️ Modular command handlers: Slash, Context Menu, and Prefix commands  
- 🔧 Configurable via `config.yml` (including your bot token)  
- 📅 Timestamped logging with Moment.js  
- 🧩 Easy to extend and customize  
- 🛡️ Supports permissions and ephemeral responses  
- 📂 Organized folder structure for commands and events  

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/DJS-Example-Bot.git
   cd DJS-Example-Bot
   ```

2. **Fill in the `config.yml` file**

   * You must provide your bot token in the configuration file before starting the bot.
   * Example `config.yml`:

     ```yaml
     token: "YOUR_BOT_TOKEN_HERE"
     prefix: "!"
     ```

3. **Start the bot**

   * Use the provided `start.bat` file (for Windows):

     ```bat
     node index.js
     ```
   * Or run via terminal (after building):
---
