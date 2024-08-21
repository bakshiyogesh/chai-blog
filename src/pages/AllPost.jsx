import React, { useEffect, useState } from 'react';
import appwiteBlogService from '../appwrite/blog';
import { Container, PostCard } from '../components';
function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {}, []);
  appwiteBlogService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });
  return (
    <div className='py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
        <PostCard />
      </Container>
    </div>
  );
}

export default AllPost;
