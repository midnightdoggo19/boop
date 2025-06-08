const winston = require('winston');
require('dotenv').config();

class DiscordTransport extends Transport {
    constructor(opts) {
        super(opts);
        this.webhookUrl = process.env.LOGHOOK || 'https://midnightdoggo19.com/api/dontcare'; // will just ignore everything
    }

    async log(info, callback) {
        setImmediate(() => this.emit('logged', info));

        if (!this.webhookUrl) return callback();

        try {
            await fetch(this.webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [
                        {
                            title: `Ticket Log`,
                            description: info.message,
                            color: 16711680,
                            timestamp: new Date().toISOString()
                        }
                    ]
                })
            });
        } catch (error) {
            console.error('Error sending log to Discord:', error);
        }
        callback();
    }
}

const logger = createLogger({
    level: process.env.LOGLEVEL || 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
    ),
    transports: [ // log to console, discord, file
        new transports.Console(),
        new transports.File({ filename: `./tickets.log` }),
        new DiscordTransport()
    ]
});

module.exports = { logger }