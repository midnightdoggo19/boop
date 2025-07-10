const { createLogger, transports, format } = require('winston');
require('dotenv').config();
const Transport = require('winston-transport');
const { isUrl } = require('check-valid-url');

let url;

if (!isUrl(process.env.LOGHOOK)) url = 'http://example.com/' // dump it
else url = process.env.LOGHOOK;

class DiscordTransport extends Transport {
    constructor(opts) {
        super(opts);
        this.webhookUrl = url;
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
                            title: 'Boop Log',
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