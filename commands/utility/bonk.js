const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../functions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bonk')
		.setDescription('bonk')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('User to bonk')
            .setRequired(true)
        )
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

	async execute(interaction) {
		await interaction.deferReply();

        const user = interaction.options.getUser('user');
        if (!user) return interaction.edirReply('Could not find the user.');

        const embed = new EmbedBuilder()
            .setTitle('Bonk!')
            .setDescription(`<@${interaction.user.id}> bonked <@${user.id}>!`)
            .setImage('https://midnightdoggo19.com/assets/boop/bonk_optimized.gif')
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        logger.debug(`${interaction.user.id} bonked ${user.id}`);
	},
};
