const z = require('zod');

const packageJSON = require('./package.json');
const APP_ENV = process.env.APP_ENV || 'development';
const path = require('path');
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});

const BUNDLE_ID = 'com.holymaiden.fihaacomicmobile'; // ios bundle id
const PACKAGE = 'com.holymaiden.fihaacomicmobile'; // android package name
const NAME = 'Fihaa Comic'; // app name
const EXPO_ACCOUNT_OWNER = 'holymaiden'; // expo account owner
const EAS_PROJECT_ID = '';
const SCHEME = 'fihaa-comic-mobile';

/**
 * @param {string} name
 * @returns  {string}
 */

const withEnvSuffix = (name) => {
  return APP_ENV === 'production' ? name : `${name}.${APP_ENV}`;
};

const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  NAME: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),
  SCHEME: z.string(),

  API_URL: z.string(),
});

const buildTime = z.object({
  EXPO_ACCOUNT_OWNER: z.string(),
  EAS_PROJECT_ID: z.string(),

  SECRET_KEY: z.string(),
});

/**
 * @type {Record<keyof z.infer<typeof client> , string | undefined>}
 */
const _client = {
  APP_ENV: APP_ENV,
  NAME: NAME,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,
  SCHEME: SCHEME,

  API_URL: process.env.API_URL,
};

/**
 * @type {Record<keyof z.infer<typeof buildTime> , string | undefined>}
 */
const _buildTimeEnv = {
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID,

  SECRET_KEY: process.env.SECRET_KEY,
};

const _env = {
  ..._client,
  ..._buildTimeEnv,
};

const merge = client.merge(buildTime);
const parsed = merge.safeParse(_env);

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,

    `\n❌ Missing variables in .env file, Make sure all required variables are defined in the .env file.`,
    `\n💡 Tip: If you recently updated the .env file and the error still persists, try restarting the server with the -cc flag to clear the cache.`,
  );
  throw new Error(
    'Invalid environment variables, Check terminal for more details ',
  );
}

const Env = parsed.data;
const ClientEnv = client.parse(_client);

module.exports = {
  Env,
  ClientEnv,
};
