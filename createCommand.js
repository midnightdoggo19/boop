const prompt = require('prompt-sync')({sigint: true});

const commandName = prompt('Command name: ');
const commandDesc = prompt('Command description: ');
const verb = prompt('Verb (user 1 ___ user2; user to ___): ');
const embedTitle = prompt('Embed title: ');
const imgURL = prompt('Image URL: ');

console.log('Creating command...\n');
console.log(`
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logger } = require('../../log');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('${commandName}')
        .setDescription('${commandDesc}')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('user to ${verb}')
            .setRequired(true)
        )
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

    async execute(interaction) {
        await interaction.deferReply();

        const user = interaction.options.getUser('user');
        if (!user) return interaction.editReply('Could not find the user.');

        const embed = new EmbedBuilder()
            .setTitle('${embedTitle}')
            .setDescription(\`<@\${interaction.user.id}> ${verb} <@\${user.id}>!\`)
            .setImage('${imgURL}')
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        logger.debug(\`\${interaction.user.id} ${verb} \${user.id}\`);
    },
};
`);

console.log(`Paste the above command into a new file: commands/utility/${commandName}.js`);
console.log('If you\'d like to further customize the command, you can do so now');