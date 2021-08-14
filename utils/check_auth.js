const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../config.js");

module.exports = (context) => {
  //context will have objects and among them it will have headers
  //context has various headers for authentication
  //context={...headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //we need to get token from the authHeader
    //convention when working with authorization token is
    //Bearer(space)...    ...=token
    //so there is two strings in the auth header one is Bearer(space) and token
    //to get the token we need second item of array
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error('Authentication token must be in "Bearer [token]');
  }
  throw new Error("Authorization Header must be provided");
};
