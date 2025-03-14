import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs'; // import the fs module
import * as path from 'path'; // import the path module
import { promises as fsPromises } from 'fs'; // import the fsPromises module

@Injectable()
// extend the ConsoleLogger class to use the logger in the app
export class MyLoggerService extends ConsoleLogger {
  // log the message to the file
  async logToFile(entry: any) {
    // format the entry
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Chicago',
    }).format(new Date())} ${entry}`;

    // create the logs directory if it doesn't exist
    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'), {
          recursive: true,
        });
      }
      // append the entry to the file
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'app.log'),
        `${formattedEntry}`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to create logs directory:', error.message);
      }
    }
  }

  // log the message with the context
  log(message: string, context?: string) {
    const entry = `[${context}] ${message}`;
    super.log(entry);
    // log the entry to the file
    this.logToFile(entry);
  }

  // log the error with the context
  error(message: string, trace?: string, stackOrContext?: string) {
    const entry = `[${stackOrContext}] ${message}`;
    super.error(entry, trace);
    // log the entry to the file
    this.logToFile(entry);
  }
}
