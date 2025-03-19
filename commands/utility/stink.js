const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../functions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stink')
        .setDescription('somebody smells')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('User that stinks')
            .setRequired(true)
        )
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

    async execute(interaction) {
        await interaction.deferReply();

        const user = interaction.options.getUser('user');
        if (!user) return interaction.editReply('Could not find the user.');

        const embed = new EmbedBuilder()
            .setTitle('ew')
            .setDescription(` <@${user.id}> stinks!`)
            .setImage('https://midnightdoggo19.com/assets/boop/stink_optimized.gif')
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        logger.debug(`${interaction.user.id} stinks according to ${user.id}`);
    },
};
