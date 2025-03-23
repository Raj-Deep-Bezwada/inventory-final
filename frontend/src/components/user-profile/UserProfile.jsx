import React, { useEffect, useState } from 'react';
import './UserProfile.css'; // ✅ Import external CSS file for styling

function UserProfile() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", count: 0, cost: 0 });
  const [editProduct, setEditProduct] = useState(null); // ✅ State to track product being edited

  // ✅ Function to fetch all products
  const fetchProducts = () => {
    fetch("https://inventory-final-gqnb.onrender.com/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.payload)) {
          setProducts(data.payload);
        } else {
          console.error("Unexpected response:", data);
        }
      })
      .catch(err => console.error("Error fetching products:", err));
  };

  // ✅ Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Handle product form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // ✅ Submit new product to backend
  const addProduct = async (e) => {
    e.preventDefault();

    const response = await fetch("https://inventory-final-gqnb.onrender.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Product added successfully!");
      setNewProduct({ name: "", count: 0, cost: 0 }); // Reset form
      fetchProducts(); // ✅ Fetch updated product list
    } else {
      alert(data.message);
    }
  };

  // ✅ Handle Edit Click (Set product in edit mode)
  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  // ✅ Handle Edit Input Change
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  // ✅ Submit Edited Product
  const updateProduct = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://inventory-final-gqnb.onrender.com/products/${editProduct.name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: editProduct.count, cost: editProduct.cost }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Product updated successfully!");
      setEditProduct(null); // ✅ Exit edit mode
      fetchProducts(); // ✅ Refresh product list
    } else {
      alert(data.message);
    }
  };

  // ✅ Delete Product
  const deleteProduct = async (productName) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const response = await fetch(`https://inventory-final-gqnb.onrender.com/products/${productName}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (response.ok) {
      alert("Product deleted successfully!");
      fetchProducts(); // ✅ Refresh product list
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="user-profile">
      <h2 className="text-center mt-3">Inventory Management</h2>

      {/* ✅ Add Product Form */}
      <div className="container mt-4 form-container">
        <h3>Add a New Product</h3>
        <form onSubmit={addProduct} className="product-form">
          <div className="mb-3">
            <label>Product Name:</label>
            <input type="text" name="name" className="form-control" value={newProduct.name} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label>Count:</label>
            <input type="number" name="count" className="form-control" value={newProduct.count} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label>Cost:</label>
            <input type="number" name="cost" className="form-control" value={newProduct.cost} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="btn btn-success">Add Product</button>
        </form>
      </div>

      {/* ✅ Edit Product Form (Only Visible in Edit Mode) */}
      {editProduct && (
        <div className="container mt-4 form-container">
          <h3>Edit Product</h3>
          <form onSubmit={updateProduct}>
            <div className="mb-3">
              <label>Product Name:</label>
              <input type="text" name="name" className="form-control" value={editProduct.name} disabled />
            </div>
            <div className="mb-3">
              <label>Count:</label>
              <input type="number" name="count" className="form-control" value={editProduct.count} onChange={handleEditInputChange} required />
            </div>
            <div className="mb-3">
              <label>Cost:</label>
              <input type="number" name="cost" className="form-control" value={editProduct.cost} onChange={handleEditInputChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Update Product</button>
          </form>
        </div>
      )}

      {/* ✅ Product Table */}
      <div className="container mt-4">
        <h3>Product Inventory</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                product && product.name ? (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.count}</td>
                    <td>{product.cost}</td>
                    <td>{product.status}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(product)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product.name)}>Delete</button>
                    </td>
                  </tr>
                ) : null
              ))
            ) : (
              <tr>
                <td colSpan="5">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserProfile;
