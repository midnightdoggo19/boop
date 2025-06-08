const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../log');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('punch')
        .setDescription('punch somebody')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('user to punch')
            .setRequired(true)
        )
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

    async execute(interaction) {
        await interaction.deferReply();

        const user = interaction.options.getUser('user');
        if (!user) return interaction.editReply('Could not find the user.');

        const embed = new EmbedBuilder()
            .setTitle('wham')
            .setDescription(`<@${interaction.user.id}> punched <@${user.id}>!`)
            .setImage('https://midnightdoggo19.com/assets/boop/punch_optimized.gif')
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        logger.debug(`${interaction.user.id} punched ${user.id}`);
    },
};
