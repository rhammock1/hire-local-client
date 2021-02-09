const endpoint = (process.env.NODE_ENV === 'development') ? 'http://localhost:8080/api' : process.env.REACT_APP_API_ENDPOINT;

export default {
  API_ENDPOINT: endpoint,
  TOKEN_KEY: 'blogful-client-auth-token',
}
