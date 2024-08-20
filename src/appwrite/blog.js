import { Client, Databases, ID, Query, Storage } from 'appwrite';
import conf from '../conf/config';

export class BlogService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.projectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status = 'active', userId }) {
    try {
      return await this.databases.createDocument(conf.databaseID, conf.collectionID, slug, { title, content, featuredImage, status, userId });
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost({ title, slug, content, featuredImage, status = 'active' }) {
    try {
      return await this.databases.updateDocument(conf.databaseID, conf.collectionID, slug, {
        title,
        content,
        featuredImage,
        status,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.databaseID, conf.collectionID, slug);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return this.databases.getDocument(conf.databaseID, conf.collectionID, slug);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(conf.databaseID, conf.collectionID, queries);
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile(file) {
    try {
      // if(!file) return ;
      // }
      return await this.bucket.createFile(conf.bucketID, ID.unique(), file);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.bucketID, fileId);
    } catch (error) {
      console.log(error);
    }
  }

  async filePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(conf.bucketID, fileId);
    } catch (error) {
      console.log(error);
    }
  }
}
const appwiteBlogService = new BlogService();
export default appwiteBlogService;
