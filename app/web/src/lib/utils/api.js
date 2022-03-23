
/**
 * Obtain the hostname address of the host
 * @returns {String}
 */
const host = () => window?.location?.hostname;

/**
 * Obtain the port address for the api
 * @returns {Number}
 */
const port = () => 8403;

/**
 * The address from `host()` and `port()`
 * @returns {String}
 */
const root = () => `http://${host()}:${port()}`;

/**
 * Builds the address where the API should be at based on the host and the api port
 * @returns {String}
 */
const address = () => `${root()}/api`;

/**
 * Build the address where the API will return an item image
 * @param {Number} id 
 */
const picture = (id) => `${address()}/music/${id}/picture`;

/**
 * Make a fetch request to the API
 * @param {Array} params URL params
 * @returns Promise
 */
const request = (params) => fetch([...address(), ...params].join(''));

/**
 * Builds calls to the API, do not use before `window` is initialized
 */
export default {
    host,
    port,
    root,
    address,
    picture,
    request
}
