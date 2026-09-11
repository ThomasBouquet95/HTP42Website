/**
 * The session cookie's name, on its own so that the middleware can import it.
 * Middleware runs on the Edge runtime, which cannot load node:crypto, so it
 * must not pull in the auth module that does the signing.
 */
export const SESSION_COOKIE = "htp42_admin";
