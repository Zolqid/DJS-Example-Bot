import { Collection } from 'discord.js';
import chalk from 'chalk';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function loadCommands(client) {
  client.commands = new Collection();
  client.aliases = new Collection();

  const commandsPath = path.join(__dirname, '../commands');

  try {
    const files = await readdir(commandsPath);

    for (const fileName of files) {
      const filePath = path.join(commandsPath, fileName);

      try {
        const { default: command } = await import(`file://${filePath}`);

        const { config } = command;

        if (!config || typeof config !== 'object') {
          console.log(chalk.red(`[Komut Atlandı] ${fileName}: config eksik ya da hatalı.`));
          continue;
        }

        const { name, aliases, code } = config;

        if (!name) {
          console.log(chalk.red(`[Komut Atlandı] ${fileName}: 'name' belirtilmemiş.`));
          continue;
        }

        if (!Array.isArray(aliases)) {
          console.log(chalk.red(`[Komut Atlandı] ${fileName}: 'aliases' bir dizi değil.`));
          continue;
        }

        if (typeof code !== 'function') {
          console.log(chalk.red(`[Komut Atlandı] ${fileName}: 'code' bir fonksiyon değil.`));
          continue;
        }

        client.commands.set(name, command);
        aliases.forEach(alias => client.aliases.set(alias, name));

        console.log(chalk.cyanBright(`✅ Prefix Komutu Yüklendi: ${name}`));
      } catch (err) {
        console.log(chalk.red(`❌ [Komut Hatası] ${fileName}: ${err.message}`));
      }
    }

  } catch (err) {
    console.error(chalk.red(`❌ Komutlar yüklenirken bir hata oluştu: ${err.message}`));
  }
}
