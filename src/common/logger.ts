export enum LogLevel {
    Info = 0,
    Warn = 1,
    Error = 2,
    Debug = 3,
    Trace = 4,
    silly = 5
}

const ansi = {
    reset: '\x1b[0m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    blue: '\x1b[34m',
    green: '\x1b[32m'
};

const logLevelColors = {
    [LogLevel.Info]: ansi.green,
    [LogLevel.Warn]: ansi.yellow,
    [LogLevel.Error]: ansi.red,
    [LogLevel.Debug]: ansi.magenta,
    [LogLevel.Trace]: ansi.blue,
    [LogLevel.silly]: ansi.cyan
};

export class Logger {
    private context: string;
    private logLevel: LogLevel;
    private static defaultContext?: string = undefined;
    private static defaultLogLevel: LogLevel = LogLevel.silly;

    constructor(context: string, logLevel: LogLevel = Logger.defaultLogLevel) {
        this.context = context;
        this.logLevel = logLevel;
    }

    private static printMsg(
        {
            level,
            context,
            maxLogLevel
        }: { level: LogLevel; context?: string; maxLogLevel?: LogLevel },
        ...args: any[]
    ) {
        if (level > (maxLogLevel ?? Logger.defaultLogLevel)) {
            return;
        }

        const time = new Date().toTimeString().split(' ')[0];
        const levelColor = logLevelColors[level];
        const contextColor = ansi.dim;
        const reset = ansi.reset;

        const messages = args.map((arg) => {
            if (typeof arg === 'string') {
                return arg;
            } else {
                return JSON.stringify(arg, null, 2);
            }
        });

        const contextStr =
            context ?? this.defaultContext
                ? ` ${contextColor}[${context ?? this.defaultContext}]${reset}`
                : '';

        console.log(
            `${ansi.dim}${time}${ansi.reset} ${levelColor}[${LogLevel[level]}]${reset}${contextStr}`,
            ...messages
        );
    }

    static setDefaultContext(context: string) {
        Logger.defaultContext = context;
    }

    static setDefaultLogLevel(logLevel: LogLevel) {
        Logger.defaultLogLevel = logLevel;
    }

    static info(...args: any[]) {
        Logger.printMsg({ level: LogLevel.Info }, ...args);
    }

    static warn(...args: any[]) {
        Logger.printMsg({ level: LogLevel.Warn }, ...args);
    }

    static error(...args: any[]) {
        Logger.printMsg({ level: LogLevel.Error }, ...args);
    }

    static debug(...args: any[]) {
        Logger.printMsg({ level: LogLevel.Debug }, ...args);
    }

    static trace(...args: any[]) {
        Logger.printMsg({ level: LogLevel.Trace }, ...args);
    }

    static silly(...args: any[]) {
        Logger.printMsg({ level: LogLevel.silly }, ...args);
    }

    info(...args: any[]) {
        Logger.printMsg(
            { level: LogLevel.Info, context: this.context, maxLogLevel: this.logLevel },
            ...args
        );
    }

    warn(...args: any[]) {
        Logger.printMsg(
            { level: LogLevel.Warn, context: this.context, maxLogLevel: this.logLevel },
            ...args
        );
    }

    error(...args: any[]) {
        Logger.printMsg(
            { level: LogLevel.Error, context: this.context, maxLogLevel: this.logLevel },
            ...args
        );
    }

    debug(...args: any[]) {
        Logger.printMsg(
            { level: LogLevel.Debug, context: this.context, maxLogLevel: this.logLevel },
            ...args
        );
    }

    trace(...args: any[]) {
        Logger.printMsg(
            { level: LogLevel.Trace, context: this.context, maxLogLevel: this.logLevel },
            ...args
        );
    }

    silly(...args: any[]) {
        Logger.printMsg(
            { level: LogLevel.silly, context: this.context, maxLogLevel: this.logLevel },
            ...args
        );
    }

    setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    setContext(context: string) {
        this.context = context;
    }
}
