export default {
    config: {
        name: 'test',
        aliases: ['test'],
        code: async (client, message, args) => {
            message.reply('Test')
        }
    }
};
