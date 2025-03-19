const { 
    Client, 
    GatewayIntentBits, 
    REST, 
    Routes,
    Events, 
    Collection
} = require('discord.js');
const { logger } = require('./functions');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

client.commands = new Collection();

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	} else if (interaction.commandName === 'suggest' && process.env.SUGGESTIONSENABLED === true) { // because DMing from the command files is hard
		const suggestion = interaction.options.getString('suggestion');
		logger.info(`New suggestion from ${interaction.user.username}: ${suggestion}`);
		await interaction.deferReply({ flags: 64 });
        await client.users.send(process.env.OWNER, `New suggestion from ${interaction.user.username}: ${suggestion}`); // you don't need to worry about this if you're hosting yourself
		await interaction.editReply({ content: 'Suggestion sent!', flags: 64 });
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

client.login(process.env.TOKEN).then(() => {
    logger.info('Discord bot is online!');
}).catch(err => {
    logger.error('Error logging into Discord:', err);
});

process.on('SIGINT', function() {
    logger.info("Caught interrupt signal, shutting down!");
    process.exit();
});
