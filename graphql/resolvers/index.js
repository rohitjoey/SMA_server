const postResolvers = require("./posts");
const userResolvers = require("./users");
const commentResolvers = require("./comments");

module.exports = {
  Post: {
    //name of the type like Post
    //each time the query or mutation or subscription returns the type it will pass through this modifier and apply these modification
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
