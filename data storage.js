import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  // your Firebase configuration
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

export const getProductById = async (productId) => {
  const snapshot = await db.ref(`products/${productId}`).once('value');
  return snapshot.val();
};

export const getProducts = async () => {
  const snapshot = await db.ref('products').once('value');
  const products = [];
  snapshot.forEach((childSnapshot) => {
    const product = childSnapshot.val();
    product.id = childSnapshot.key;
    products.push(product);
  });
  return products;
};

export const addProduct = async (product) => {
  const newProductRef = db.ref('products').push();
  await newProductRef.set(product);
  return newProductRef.key;
};

export const updateProduct = async (productId, updates) => {
  await db.ref(`products/${productId}`).update(updates);
};

export const deleteProduct = async (productId) => {
  await db.ref(`products/${productId}`).remove();
};
