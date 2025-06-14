const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../log');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('boop')
		.setDescription('Boop')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('User to boop')
            .setRequired(true)
        )
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

	async execute(interaction) {
		await interaction.deferReply();

        const user = interaction.options.getUser('user');
        if (!user) return interaction.editReply('Could not find the user.');

        const embed = new EmbedBuilder()
            .setTitle('Boop!')
            .setDescription(`<@${interaction.user.id}> booped <@${user.id}>!`)
            .setImage('https://midnightdoggo19.com/assets/boop/boop_optimized.gif')
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        logger.debug(`${interaction.user.id} booped ${user.id}`);
	},
};
