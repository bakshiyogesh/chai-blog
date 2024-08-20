import conf from '../conf/config';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.projectID);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    console.log('Email,pasword', email, password, name);
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      console.log(userAccount, 'userAccount');
      if (userAccount) {
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async logoutUser() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
  async passwordRecovery({ email }) {
    try {
      await this.account.createRecovery(email, conf.appwriteURL);
    } catch (error) {
      console.log(error);
    }
  }
}
const authService = new AuthService();
export default authService;
