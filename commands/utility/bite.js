const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../log');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bite')
        .setDescription('bite somebody')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('user to bite')
            .setRequired(true)
        )
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

    async execute(interaction) {
        await interaction.deferReply();

        const user = interaction.options.getUser('user');
        if (!user) return interaction.editReply('Could not find the user.');

        const embed = new EmbedBuilder()
            .setTitle('chomp')
            .setDescription(`<@${interaction.user.id}> bit <@${user.id}>!`)
            .setImage('https://midnightdoggo19.com/assets/boop/bite_optimized.gif')
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        logger.debug(`${interaction.user.id} bit ${user.id}`);
    },
};
