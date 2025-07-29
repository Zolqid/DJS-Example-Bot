import pkg from 'discord.js';
const { ContextMenuCommandBuilder, ApplicationCommandType, InteractionResponseFlags } = pkg;


export default {
    data: new ContextMenuCommandBuilder()
        .setName('Test')
        .setType(ApplicationCommandType.User),

    /**
     * @param {import('discord.js').ChatInputCommandInteraction | import('discord.js').ContextMenuCommandInteraction} interaction
     * @param {import('discord.js').Client} client
     */
    async execute(interaction, client) {
        await interaction.reply({
            content: 'Test',
            flags: InteractionResponseFlags.Ephemeral
        });
    },
};
