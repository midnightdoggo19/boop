const { SlashCommandBuilder } = require('discord.js');

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
        if (!user) return interaction.edirReply('Could not find the user.');

        await interaction.editReply(`Boop <@${user.id}>!`);
	},
};