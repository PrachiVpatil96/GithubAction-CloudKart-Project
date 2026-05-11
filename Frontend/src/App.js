import React, { useEffect, useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import API from './services/api';

function App() {

  const [products, setProducts] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = async (product) => {
    try {
      await API.post('/products', product);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">

      <h1>Prachi CloudKart</h1>

      <ProductForm onAdd={addProduct} />

      <ProductList
        products={products}
        onDelete={deleteProduct}
      />

    </div>
  );
}

export default App;