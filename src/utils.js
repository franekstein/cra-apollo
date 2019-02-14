const AUTH_TOKEN = "AUTH_TOKEN";

let token;

export const getAsyncToken = async () => {
  return localStorage.getItem(AUTH_TOKEN);
};

getAsyncToken().then(t => token = t);

export const getToken = () => token;

export const saveToken = newToken => {
  token = newToken;
  localStorage.setItem(AUTH_TOKEN, token);
};

export const removeToken = () => {
  token = undefined;
  localStorage.removeItem(AUTH_TOKEN);
};

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
