const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../functions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bake')
        .setDescription('Make biscuits')
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

    async execute(interaction) {
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setTitle('bakery')
            .setDescription(`<@${interaction.user.id}> is making biscuits!`)
            .setImage('https://midnightdoggo19.com/assets/boop/knead_optimized.gif')
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        logger.debug(`${interaction.user.id} is making biscuits`);
    },
};