const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../functions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dance')
        .setDescription('dance the night away')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('user to dance at')
            .setRequired(true)
        )
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

    async execute(interaction) {
        await interaction.deferReply();

        const user = interaction.options.getUser('user');
        if (!user) return interaction.editReply('Could not find the user.');

        const embed = new EmbedBuilder()
            .setTitle('boogie robots')
            .setDescription(`<@${interaction.user.id}> is dancing at <@${user.id}>!`)
            .setImage('https://midnightdoggo19.com/assets/boop/dancing_optimized.gif')
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        logger.debug(`${interaction.user.id} dance at ${user.id}`);
    },
};
