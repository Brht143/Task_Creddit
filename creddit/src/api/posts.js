import instance from "./api";

// Get All Posts
async function getAllPosts() {
  const data = await instance.get("/");
  console.log("All Posts ", data);
  return data;
}

// Get Post by Id
async function getPostById(postId) {
  const data = await instance.get(`/${postId}`);
  console.log("Post By Id ", data);
  return data;
}

// Add Post
async function addPost(formData) {
  //   console.log("Add Post", formData);
  const data = await instance.post("/", formData);
  console.log("Add Post ", data);
  return data;
}

// Add Comment
async function addComment(formData) {
  const { username, comment, postId } = formData;
  console.log("Add Post initial", postId);
  const data = await instance.post(`/${postId}/comments`, {
    username,
    comment,
  });
  console.log("Add Post ", data);
  return data;
}

// Delete Post
async function deletePost(postId) {
  const data = await instance.delete(`/${postId}`);
  console.log("Delete Post ", data);
  return data;
}

// Delete Comment
async function deleteComment(commentId) {
  //   console.log("Delete Comment", formData);
  const data = await instance.delete(`/comments/${commentId}`);
  console.log("Delete Comment ", data);
  return data;
}

export {
  getAllPosts,
  getPostById,
  addPost,
  addComment,
  deletePost,
  deleteComment,
};
