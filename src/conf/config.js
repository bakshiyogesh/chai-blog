const conf = {
  appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
  projectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  databaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  bucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  collectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
};
console.log(conf, 'conf');
const apiURL = import.meta.env.VITE_API_URL;
console.log(apiURL, 'apiURL');
export default conf;
