import { readdir } from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function loadEvents(client) {
    const eventsPath = path.join(__dirname, '../events');
    const files = await readdir(eventsPath);

    for (const file of files) {
        if (!file.endsWith('.js')) continue;

        const eventName = file.replace('.js', '');
        const filePath = `file://${path.join(eventsPath, file)}`;

        try {
            const { default: eventHandler } = await import(filePath);
            client.on(eventName, (...args) => eventHandler(...args, client));

            console.log(chalk.yellowBright(`📥 Event yüklendi: ${eventName}`));
        } catch (error) {
            console.log(chalk.red(`❌ Event yüklenirken hata oluştu (${eventName}): ${error.message}`));
        }
    }

    console.log("\n")
}
