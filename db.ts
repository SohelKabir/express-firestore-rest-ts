import * as admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export class Firestore {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  collection(
    name: string
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return this.db.collection(name);
  }
}
