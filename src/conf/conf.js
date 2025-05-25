const conf = {

    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL || ''),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymceID : String(import.meta.env.VITE_TINYMCE_ID),

}


console.log('Debug env vars:', {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
    tinymceID: import.meta.env.VITE_TINYMCE_ID,
})

export default conf



