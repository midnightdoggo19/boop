// this command runs two commands in the shell: fortune and cowsay
// in order for this command to work, these packages must be installed!!!
// you can get them by running `apt-get install fortunes cowsay`
// (or with whatever package management tool you use)
// k thx byeeeeeeeee

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { SlashCommandBuilder } = require('discord.js');
const { logger } = require('../../log');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fortune')
		.setDescription('See what fate has in store')
        .setContexts(0, 1),
	async execute(interaction) {
        await interaction.deferReply();
        try {
            const { stdout, stderr } = await exec('fortune | cowsay');
            logger.debug(`stdout:\n ${stdout}\n${interaction.user.id} spoke to the Cow`);
            if (stderr) logger.debug(`stderr:\n ${stderr}`);

            await interaction.editReply(`\`\`\`\n${stdout}\n\`\`\``);
        } catch (e) {
            logger.error(e);
            logger.debug('Are the correct packages installed (see comment in commands/utility/fortune.js)')
        };
	},
};