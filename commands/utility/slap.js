const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../log');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slap')
		.setDescription('slap somebody')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('User to slap')
            .setRequired(true)
        )
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

	async execute(interaction) {
		await interaction.deferReply();

        const user = interaction.options.getUser('user');
        if (!user) return interaction.editReply('Could not find the user.');

        const embed = new EmbedBuilder()
            .setTitle('high quality title © 2025 Midnight Doggo')
            .setDescription(`<@${interaction.user.id}> slapped <@${user.id}>!`)
            .setImage('https://midnightdoggo19.com/assets/boop/slap_optimized.gif')
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        logger.debug(`${interaction.user.id} slapped ${user.id}`);
	},
};
