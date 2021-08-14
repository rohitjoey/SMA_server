const { AuthenticationError } = require("apollo-server");
const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check_auth");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: {
            body: "Comment must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },

    async deleteComment(_, { postId, commentId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          const commentIndex = post.comments.findIndex(
            (c) => c.id === commentId
          );

          if (user.username === post.comments[commentIndex].username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Cannot perform this action");
          }
        } else throw new UserInputError("Post not found");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
