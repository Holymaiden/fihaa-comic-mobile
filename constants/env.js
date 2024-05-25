import Constants from 'expo-constants';

/**
 *  @type {typeof import('../../env.js').ClientEnv}
 */

// Don't worry about TypeScript here; we know we're passing the correct environment variables to `extra` in `app.config.ts`.

// @ts-expect-error
export const Env = Constants.expoConfig?.extra ?? {};
