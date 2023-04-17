import { Firestore } from '../../db';

export interface BookData {
  title: string;
  author: string;
  year: number;
  [key: string]: any;
}

export interface Book extends BookData {
  id: string;
}

export class Book {
  constructor(data: BookData, id?: string) {
    Object.assign(this, data);
    if (id) {
      this.id = id;
    }
  }

  async save(): Promise<Book> {
    const db = new Firestore();
    const ref = await db.collection('books').add(Object.assign({}, this));
    return new Book(this, ref.id);
  }

  async update(data: BookData): Promise<Book> {
    const db = new Firestore();
    await db.collection('books').doc(this.id).update(data);
    const updatedDoc = await db.collection('books').doc(this.id).get();
    const updatedData = updatedDoc.data() as BookData;
    Object.assign(this, updatedData);
    return this;
  }

  async delete(): Promise<void> {
    const db = new Firestore();
    await db.collection('books').doc(this.id).delete();
  }

  static async getAll(): Promise<Book[]> {
    const db = new Firestore();
    const snapshot = await db.collection('books').get();
    return snapshot.docs.map((doc) => new Book(doc.data() as BookData, doc.id));
  }

  static async getById(id: string): Promise<Book | null> {
    const db = new Firestore();
    const doc = await db.collection('books').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return new Book(doc.data() as BookData, doc.id);
  }
}
