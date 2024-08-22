import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import appwiteBlogService from '../appwrite/blog';
import { useSelector } from 'react-redux';
function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwiteBlogService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0 && !authStatus) {
    return (
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <div className='flex flex-wrap'>
            <div className='p-2 w-full'>
              <h1 className='text-2xl font-bold hover:text-gray-500'>Login to read posts</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else if (authStatus && posts.length === 0) {
    return (
      <div className='w-full  flex justify-center items-center h-full'>
        <h2 className='text-blue-50 font-serif '>No article found to show . Please create your first blog article</h2>
      </div>
    );
  }
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => {
            <div className='p-2 w-1/4' key={post.$id}>
              <PostCard {...post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
