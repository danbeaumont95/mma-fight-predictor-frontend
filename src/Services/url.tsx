const isLocalhost = () => {
  const hostname = window.location.hostname || document.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1';
};
// eslint-disable-next-line import/prefer-default-export
export const url: string = isLocalhost() ? 'http://127.0.0.1:8000' : 'https://mma-fight-predictor-backend.onrender.com'
