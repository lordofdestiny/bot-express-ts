import * as Discord from "discord.js";
import * as Helpers from "../Helpers";

interface BotOptions {
  prefix?: string;
  noCommandMessage?: string;
}

const defaultBotOptions: any = {
  prefix: "!",
  unknownCommandMessage: "Sorry, I did not recognize that command!",
};

declare type CommandHandler = any;

export class Bot {
  private commandHandlers: Map<string, CommandHandler>;
  private client: Discord.Client;
  private options: BotOptions;
  constructor(config: BotOptions, clientOptions: Discord.ClientOptions) {
    this.options = Helpers.AssignOptions(config, defaultBotOptions);
    this.client = new Discord.Client(clientOptions);
    this.commandHandlers = new Map<string, CommandHandler>();

    this.client.addListener("message", this.defaultOnMessageHandler());
  }

  private defaultOnMessageHandler() {
    const that = this;
    return function (message: Discord.Message) {
      if (message.author.bot) return;

      const { command, rawArgs } = Helpers.DestructureMessage(message.content);

      if (!that.commandHandlers.has(command)) {
        message.reply(`${that} Try using help command!`);
        return;
      }

      return that.commandCaller(message, command, rawArgs);
    };
  }

  private commandCaller(
    message: Discord.Message,
    commandName: string,
    commandArgs: string
  ) {
    const command = this.commandHandlers.get(commandName);

    if (!command.IsImplemented) return;
  }
}
