const { 
    Client, 
    GatewayIntentBits, 
    REST, 
    Routes,
    Events 
} = require('discord.js');

require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const commands = [
    {
        name: 'boop', // command name
        description: 'Boop',
        options: [
            {
                name: 'message',
                type: 6,
                description: 'Person to boop',
                required: true,
            },
        ],
    },
];

(async () => {
try {
    console.log('Registering slash commands...');
    await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
    );
    console.log('Slash commands registered!');
} catch (err) {
    console.error('Error registering slash commands:', err);
}})();

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'boop') {
        const user = interaction.options.getUser('message');
        if (!user) return interaction.reply('Could not find the user.');

        await interaction.reply(`Boop <@${user.id}>!`);
    }
});

if (!process.env.TOKEN || !process.env.CLIENT_ID) {
    logger.error('Missing TOKEN or CLIENT_ID in the environment variables.');
    process.exit(1);
}

client.login(process.env.TOKEN).then(() => {
    logger.info('Discord bot is online!');
}).catch(err => {
    logger.error('Error logging into Discord:', err);
});

process.on('SIGINT', function() {
    logger.info("Caught interrupt signal, shutting down!");
    process.exit();
});
