
const refreshCookieExpiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
const accessCookieExpiration =  new Date(Date.now() + 1000 * 60 * 30);


export { refreshCookieExpiration, accessCookieExpiration };