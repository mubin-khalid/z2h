export default () => ({
  jwt: {
    secret: process.env.APP_SECRET,
    expires: process.env.EXPIRATION,
  },
});
