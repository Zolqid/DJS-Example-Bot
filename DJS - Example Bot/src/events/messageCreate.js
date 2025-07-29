export default async function handleMessage(message) {
  const client = message.client;
  const config = client.config;
  const prefix = config.prefix || '!';

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  const command =
    client.commands.get(commandName) ||
    client.commands.get(client.aliases.get(commandName));

  if (!command || !command.config || typeof command.config.code !== 'function') return;

  try {
    await command.config.code(client, message, args);
  } catch (error) {
    console.error(`❌ Komut çalıştırılırken hata oluştu:`, error);
    message.reply('❌ Komut çalıştırılırken bir hata oluştu.');
  }
}
