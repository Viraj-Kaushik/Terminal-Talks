// to create post, delete post, update post, upload photo, get photo preview

import conf from "../conf/conf";

import { Client, Databases, ID, Storage, Query } from "appwrite"; 

export class Services{

    client = new Client();
    databases;
    bucket;     // storage

    constructor(){
        
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    // create a new post

    async createPost( {title, slug, content, featuredImage,  status, userId} ) {

        try{

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }
        catch(error) {
            console.log("Error in createPost :: ",error);
        }

    }

    // update post

    async updatePost( slug, {title, content, featuredImage, status} ) {

        try{

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status, 
                }
            )

        }
        catch(error){
            console.log("Error in updatePost :: config.js :: ",error);
        }

    }

    // deleting post

    async deletePost(slug) {

        try{

            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true;

        }
        catch(error){
            console.log("Error in deletePost :: config.js :: ", error);
            return false;
        }

    }

    // get a post

    async getPost(slug) {

        try{

            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        }
        catch(error) {
            console.log("Error in getPost :: config,js :: ", error);
            return false;
        }

    } 

    // get all the *active* posts

    async getPosts( queries = [Query.equal('status','active') ] ) {

        try{

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
                // or
                // [
                //     queries = [Query.equal('status','active') ]
                // ]
            )

        }
        catch(error) {
            console.log("Error in getPosts :: config.js :: ", error);
            return false;
        }

    }

    // upload file

    async uploadFile(file) {

        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),                // file id
                file                        // file
            )
        }
        catch(error){
            console.log("Error in upload file :: ", error);
            return false;
        }

    }

    // delete file

    async deleteFile(fileId) {

        try{

            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            
            return true;

        }
        catch(error) {
            console.log("Error in deleteFile :: ", error);
            return false;
        }

    }

    // to get the preview of the file

    // it has very fast response that's why no need for async function

    getFilePreview(fileId) {

        try{

            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )

        }
        catch(error) {
            console.log("Error in getFilePreview :: ", error);
        }

    }

    // to get file view as preview is for upper plans

    getFileView(fileId) {

        try{

            return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            )

        }
        catch(error) {
            console.log("Error in getFileView :: ", error);
        }

    }


}



const services = new Services();

export default services;