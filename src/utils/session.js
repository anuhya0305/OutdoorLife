// True while a JWT's exp claim is in the future. The API still verifies the signature;
// this only saves a round trip for expired or missing sessions.
export const tokenValid = (token) => {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload)).exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
