// lib/appwrite.js
import { Client, Account, Databases, ID } from "appwrite";

// TODO: replace with your real IDs from Appwrite dashboard
const PROJECT_ID = "690d1bec002f907c1280";
const DATABASE_ID = "691cf6bb00123d523339";
const COLLECTION_ID = "books";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1") // Appwrite Cloud endpoint
  .setProject(PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID, DATABASE_ID, COLLECTION_ID };