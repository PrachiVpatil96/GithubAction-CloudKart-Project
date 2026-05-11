import React, { useState } from 'react';

function ProductForm({ onAdd }) {

  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd(product);

    setProduct({
      name: '',
      price: '',
      quantity: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={product.quantity}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Product</button>

    </form>
  );
}

export default ProductForm;