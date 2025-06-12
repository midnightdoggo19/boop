const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../log');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('check if the bot\'s online')
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

    async execute(interaction) {
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setTitle('get snuck up on')
            .setDescription('i have hurt... your feelings')
            .setImage('https://midnightdoggo19.com/assets/boop/callbackPing_optimized.gif')
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        logger.debug(`${interaction.user.id} said BITE ME`);
    },
};
