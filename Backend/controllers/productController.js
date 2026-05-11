const pool = require('../config/db');


// Get all products
const getProducts = async (req, res) => {

  try {

    const result = await pool.query(
      'SELECT * FROM products ORDER BY id DESC'
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);
    res.status(500).json({
      error: 'Failed to fetch products'
    });

  }

};


// Create product
const createProduct = async (req, res) => {

  try {

    const { name, price, quantity } = req.body;

    const result = await pool.query(
      'INSERT INTO products(name, price, quantity) VALUES($1, $2, $3) RETURNING *',
      [name, price, quantity]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Failed to create product'
    });

  }

};


// Delete product
const deleteProduct = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      'DELETE FROM products WHERE id=$1',
      [id]
    );

    res.json({
      message: 'Product deleted successfully'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Failed to delete product'
    });

  }

};


module.exports = {
  getProducts,
  createProduct,
  deleteProduct
};