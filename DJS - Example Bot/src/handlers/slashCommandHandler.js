import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { readdir } from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment';
import { fileURLToPath } from 'url';

moment.locale('tr');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function loadSlashCommands(client) {
    const slashCommands = [];
    client.slashCommands = new Map();
    client.contextCommands = new Map();

    const slashPath = path.join(__dirname, '../slashCommands');
    const contextPath = path.join(__dirname, '../contextMenuCommands');

    try {
        const slashFiles = (await readdir(slashPath)).filter(f => f.endsWith('.js'));
        for (const file of slashFiles) {
            const { default: command } = await import(`file://${path.join(slashPath, file)}`);
            if (!command?.data?.name) {
                console.log(chalk.redBright(`❌ Slash Komutu atlandı: ${file}`));
                continue;
            }
            client.slashCommands.set(command.data.name, command);
            slashCommands.push(command.data.toJSON());
            console.log(chalk.blueBright(`📘 Slash Komutu yüklendi: ${command.data.name}`));
        }
    } catch (e) {
        console.error(chalk.red(`❌ Slash komutları yüklenemedi: ${e.message}`));
    }

    console.log("\n")

    try {
        const contextFiles = (await readdir(contextPath)).filter(f => f.endsWith('.js'));
        for (const file of contextFiles) {
            const { default: command } = await import(`file://${path.join(contextPath, file)}`);
            if (!command?.data?.name) {
                console.log(chalk.redBright(`❌ Context Komutu atlandı: ${file}`));
                continue;
            }
            client.contextCommands.set(command.data.name, command);
            slashCommands.push(command.data);
            console.log(chalk.magentaBright(`📗 Context Menu yüklendi: ${command.data.name}`));
        }
    } catch (e) {
        console.error(chalk.red(`❌ Context komutları yüklenemedi: ${e.message}`));
    }

    console.log("\n")

    client.on('ready', async () => {
        const CLIENT_ID = client.user.id;
        const rest = new REST({ version: '10' }).setToken(client.config.token);

        try {
            await rest.put(Routes.applicationCommands(CLIENT_ID), { body: slashCommands });
            console.log(chalk.greenBright(`✅ ${moment().format('LLL')} | Tüm komutlar Discord API'ye yüklendi.`));
        } catch (err) {
            console.error(chalk.red(`❌ Komutlar yüklenirken hata oluştu: ${err.message}`));
        }
    });
}
