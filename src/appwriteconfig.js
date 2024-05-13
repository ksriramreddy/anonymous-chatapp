import { Client , Databases,Account} from 'appwrite';
export const PROJECT_ID = '663db53d00366fc418e7'
export const DATABASE_ID = '663db6b30004a72a3cfd'
export const COLLECTION_ID_MESSAGES = '663db6f10030d9d91851'

const client = new Client();
export const account = new Account(client)
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('663db53d00366fc418e7');
export const databases = new Databases(client);
export default client