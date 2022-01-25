import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Post from './Post';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Posts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(BASE_API_URL + '/api/feed');
      if (response.ok) {
        const results = await response.json();
        setPosts(results.data);
      }
      else {
        setPosts(null);
      }
    })();
  }, []);

  return (
    <>
      {posts === undefined ?
        <Spinner animation="border" />
      :
        <>
          {posts === null ?
            <p>Could not retrieve blog posts.</p>
          :
            <>
              {posts.length === 0 ?
                <p>There are no blog posts.</p>
              :
                posts.map(post => <Post key={post.id} post={post} />)
              }
            </>
          }
        </>
      }
    </>
  );
}
