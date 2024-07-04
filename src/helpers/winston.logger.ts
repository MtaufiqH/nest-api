import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
    level: 'info', // Default log level (change as needed)
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) => `<span class="math-inline">\{info\.timestamp\} \[</span>{info.level}] ${info.message}`),
    ),
    transports: [
        // Console transport (optional)
        new transports.Console({ format: format.combine(format.colorize(), format.simple()) }),
        // File transport (optional)
        // new transports.File({ filename: 'app.log' }),
    ],
});