import { Client, GatewayIntentBits, Partials } from 'discord.js';
import fs from 'fs';
import yaml from 'js-yaml';
import moment from 'moment';
import { fileURLToPath } from 'url';
import path from 'path';

moment.locale('tr');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = yaml.load(fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8'));

const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildInvites,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.User,
    ],
});

client.config = config;

async function main() {
    try {
        const { default: loadSlashCommands } = await import('./src/handlers/slashCommandHandler.js');
        const { default: loadEvents } = await import('./src/handlers/eventHandler.js');
        const { default: loadCommands } = await import('./src/handlers/commandHandler.js');

        await loadSlashCommands(client);
        await loadEvents(client);
        await loadCommands(client);

        process.on('unhandledRejection', (error) => {
            console.error(`${moment().format('LL - LTS')} - Unhandled Rejection:`, error);
        });

        await client.login(config.token);
    } catch (error) {
        console.error('Başlatma sırasında hata oluştu:', error);
    }
}

main();
