// for authentication of user : create account, login, logout

import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // for creation of account

    async createAccount( {email,password,name} ){

        try{
            const userAccount = await this.account.create( ID.unique(), email, password, name );

            if(userAccount){
                // call some method
                return this.login({email,password});        // login when account is created
            }
            else{
                return userAccount;
            }

        }
        catch(error) {
            throw error;
        }

    }

    // for login


    async login( {email , password} ) {

        try{

            return await this.account.createEmailPasswordSession(email,password);

        }
        catch(error){
            throw error;
        }

    }

    // to get the info of the current logged in user

    async getCurrentUser(){

        try{
            return await this.account.get();
        }
        catch(error) {

            if(error.code===401){   // to clean console
                // console.debug("User not authenticated");
            }
            else{
                console.log("Appwrite Service Error :: Error in getCurrentUser",error.message, error.code)
            }

            
            
        } 
        
        return null;        // in case try does not work

    }

    // for logout

    async logout() {
        
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            console.log("Error in logout :: service appwrite ",error);
        }

    }


}


const authService = new AuthService()       // creating object of class

export default authService                 // exporting object directly