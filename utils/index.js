export const wait = (delay = 5000) => new Promise(resolve => setTimeout(resolve, delay));

export const error = (message = 'An error occurred') => {
  throw new Error(message);
}