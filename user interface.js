import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const PRODUCTS = [
  { id: 1, name: 'Product 1', price: 10.99, image: require('./images/product1.png') },
  { id: 2, name: 'Product 2', price: 19.99, image: require('./images/product2.png') },
  { id: 3, name: 'Product 3', price: 14.99, image: require('./images/product3.png') },
  // ... more products ...
];

const ProductItem = ({ product, onPress }) => (
  <TouchableOpacity style={styles.productItem} onPress={() => onPress(product)}>
    <Image style={styles.productImage} source={product.image} />
    <Text style={styles.productName}>{product.name}</Text>
    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
  </TouchableOpacity>
);

const ProductCatalogScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from server
    setProducts(PRODUCTS);
  }, []);

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} onPress={handleProductPress} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productList: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  productImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginRight: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#999',
  },
});

export default ProductCatalogScreen;
