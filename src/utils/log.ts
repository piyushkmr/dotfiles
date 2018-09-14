interface IColors {
  Reset: string;
  Bright: string;
  Dim: string;
  Underscore: string;
  Blink: string;
  Reverse: string;
  Hidden: string;
  Black: string;
  Red: string;
  Green: string;
  Yellow: string;
  Blue: string;
  Magenta: string;
  Cyan: string;
  White: string;
  BgBlack: string;
  BgRed: string;
  BgGreen: string;
  BgYellow: string;
  BgBlue: string;
  BgMagenta: string;
  BgCyan: string;
  BgWhite: string;
}

type IColorValues = 'Reset' | 'Bright' | 'Dim' | 'Underscore' | 'Blink' | 'Reverse' | 'Hidden' |
  'Black' | 'Red' | 'Green' | 'Yellow' | 'Blue' | 'Magenta' | 'Cyan' | 'White' |
  'BgBlack' | 'BgRed' | 'BgGreen' | 'BgYellow' | 'BgBlue' | 'BgMagenta' | 'BgCyan' | 'BgWhite';
interface ILogParams {
  level?: 'log' | 'info' | 'warn' | 'error';
  color?: IColorValues;
  prefix?: string;
}

const COLORS: IColors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  Black: '\x1b[30m',
  Red: '\x1b[31m',
  Green: '\x1b[32m',
  Yellow: '\x1b[33m',
  Blue: '\x1b[34m',
  Magenta: '\x1b[35m',
  Cyan: '\x1b[36m',
  White: '\x1b[37m',
  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};

const log = (message, params: ILogParams = {level: 'log'}) => {
  const level = params.level || 'log';
  const prefixes = {
    log: '⋯',
    info: 'ⓘ',
    warn: '⚠',
    error: '✖',
  };
  const logColors = {
    log: '',
    info: '',
    warn: COLORS.Yellow,
    error: COLORS.Red,
  };

  let prefix = params.prefix || prefixes[level];
  prefix += ' ';

  let color = COLORS[params.color] || '';
  color = color ? color : logColors[level];
  console[level].call(this, color, prefix, message, COLORS.Reset);
};

export default {
  log: (message, params?: ILogParams) => log(message, params),
  info: (message) => log(message, {level: 'info'}),
  success: (message) => log(message, {level: 'info', prefix: '✔', color: 'Green'}),
  warn: (message) => log(message, {level: 'warn'}),
  error: (message) => log(message, {level: 'error'}),
};
