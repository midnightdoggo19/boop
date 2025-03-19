const { SlashCommandBuilder } = require('discord.js');
const { logger } = require('../../functions');
require('dotenv').config();

module.exports = {
    cooldown: 120,
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Send a suggestion in')
        .addStringOption(option =>
            option.setName('suggestion')
            .setDescription('suggestion')
            .setRequired(true)
        )
        .setContexts(0, 1, 2)
        .setIntegrationTypes(0, 1),

    async execute(interaction) {
        return; // all handled in index.js
    }
}