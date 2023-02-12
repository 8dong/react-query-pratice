import { useQuery, useMutation } from '@tanstack/react-query';

async function fetchComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'DELETE'
  });
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'PATCH',
    data: { title: 'REACT QUERY FOREVER!!!!' }
  });
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError } = useQuery(['comments', post.id], () =>
    fetchComments(post.id)
  );

  // DELETE Mutation
  const deleteMutation = useMutation((postId) => deletePost(postId));

  //  PATCH Mutation
  const updateMutation = useMutation((postId) => updatePost(postId));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isLoading && <div>Deleting the post...</div>}
      {deleteMutation.isError && <div>Error deleting the post</div>}
      {deleteMutation.isSuccess && <div>Post has (not) been deleted</div>}
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {updateMutation.isLoading && <div>Updating the post...</div>}
      {updateMutation.isError && <div>Error updating the post</div>}
      {updateMutation.isSuccess && <div>Post has (not) been updated</div>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
