import React from 'react';
import appwriteService from '../appwrite/blog';
import { Link } from 'react-router-dom';
function PostCard({ $id, title, featuredImage }) {
  console.log('featuredImage', $id, title, featuredImage);
  if (!$id || title || !featuredImage) {
    return (
      <div className='flex items-center justify-center'>
        <h1 className='text-blue-100 text-3xl'> No data Found for post</h1>
      </div>
    );
  }
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl- p-4 '>
        <div className='w-full justify-center mb-4'>
          <img src={appwriteService.filePreview(featuredImage)} alt={title} className='rounded-xl' />
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
