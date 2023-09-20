module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "defautl",
    expiresIn: "1d",
  },
};
