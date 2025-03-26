const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../functions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wave')
		.setDescription('greet a user')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('User to wave to')
            .setRequired(true)
        )
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

	async execute(interaction) {
		await interaction.deferReply();

        const user = interaction.options.getUser('user');
        if (!user) return interaction.editReply('Could not find the user.');

        const embed = new EmbedBuilder()
            .setTitle('👋')
            .setDescription(`<@${interaction.user.id}> waved to <@${user.id}>!`)
            .setImage('https://midnightdoggo19.com/assets/boop/wave_optimized.gif')
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        logger.debug(`${interaction.user.id} waved to ${user.id}`);
	},
};
