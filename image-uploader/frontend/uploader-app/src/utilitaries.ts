export const isProduction = (): boolean => {
  return window.location.host.toLowerCase().indexOf('localhost') === -1;
};
