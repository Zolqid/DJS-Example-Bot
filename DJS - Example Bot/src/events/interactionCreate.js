export default async function interactionCreate(interaction) {
    const client = interaction.client;

    try {
        if (interaction.isContextMenuCommand()) {
            const command = client.contextCommands.get(interaction.commandName);
            if (!command) return;

            await command.execute(interaction, client);
            return;
        }

        if (interaction.isChatInputCommand()) {
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) return;

            await command.execute(interaction, client);
            return;
        }
    } catch (error) {
        console.error('❌ Komut çalıştırılırken hata oluştu:', error);
        if (interaction.replied || interaction.deferred) {
            await interaction.editReply({
                content: '❌ Bir hata oluştu!',
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: '❌ Bir hata oluştu!',
                ephemeral: true,
            });
        }
    }
}
