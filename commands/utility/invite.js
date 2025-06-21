const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../log');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('get invited to the support server')
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

    async execute(interaction) {
        await interaction.reply({content: 'discord.gg/DjQbMn7sgY', flags: 64}); // max 50 uses
        logger.debug(`${interaction.user.id} was cordially invited in server ${interaction.guild.id}`);
    },
};
