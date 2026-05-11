import React from 'react';

function ProductList({ products, onDelete }) {

  return (
    <div className="product-list">

      {products.map((product) => (
        <div key={product.id} className="card">

          <h3>{product.name}</h3>

          <p>Price: ₹{product.price}</p>

          <p>Quantity: {product.quantity}</p>

          <button onClick={() => onDelete(product.id)}>
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default ProductList;