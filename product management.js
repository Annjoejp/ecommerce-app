import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  // your Firebase configuration
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export const addProduct = async (product) => {
  const docRef = await db.collection('products').add(product);
  return docRef.id;
};

export const getProduct = async (productId) => {
  const docRef = db.collection('products').doc(productId);
  const doc = await docRef.get();
  if (doc.exists) {
    return { ...doc.data(), id: doc.id };
  } else {
    return null;
  }
};

export const updateProduct = async (productId, updates) => {
  const docRef = db.collection('products').doc(productId);
  await docRef.update(updates);
};

export const deleteProduct = async (productId) => {
  const docRef = db.collection('products').doc(productId);
  await docRef.delete();
};

export const getAllProducts = async () => {
  const snapshot = await db.collection('products').get();
  const products = [];
  snapshot.forEach((doc) => {
    const product = doc.data();
    product.id = doc.id;
    products.push(product);
  });
  return products;
};
