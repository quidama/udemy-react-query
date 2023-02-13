import { useQuery, useMutation } from '@tanstack/react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, error, isError } = useQuery(
    ['comments', post.id],
    () => fetchComments(post.id)
  );

  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));

  if (isLoading) return <h3>Loading...</h3>;
  if (error)
    return (
      <>
        <h3>something wrong</h3>
        <h3>{error}</h3>
      </>
    );

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <p style={{ color: 'red' }}>Error deleting the post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: 'blue' }}>Deleting the post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: 'green' }}>Posts has (not) been post</p>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isError && (
        <p style={{ color: 'red' }}>Something wednt wrong!!</p>
      )}
      {updateMutation.isLoading && (
        <p style={{ color: 'blue' }}>Loading...!!</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: 'green' }}>post updated!!</p>
      )}
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
