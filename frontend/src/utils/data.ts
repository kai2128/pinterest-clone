export const userQuery = (userId) => {
  const query
  // groq
  = `*[_type == "user" && _id == '${userId}']`
  return query
}
