import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css"; // Importing the CSS file

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", description: "", category: "", image: null });
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const uploadImage = async (imageFile) => {
    const imgData = new FormData();
    imgData.append("image", imageFile);

    try {
      const { data } = await axios.post("http://localhost:5000/api/upload", imgData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = null;
      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }

      await axios.post("http://localhost:5000/api/products", { ...formData, image: imageUrl });
      alert("✅ Product added successfully");
      fetchProducts();
      setFormData({ name: "", price: "", description: "", category: "", image: null });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;

      if (typeof formData.image !== "string") {
        imageUrl = await uploadImage(formData.image);
      }

      await axios.put(`http://localhost:5000/api/products/${editProductId}`, { ...formData, image: imageUrl });
      alert("✅ Product updated successfully");
      fetchProducts();
      setFormData({ name: "", price: "", description: "", category: "", image: null });
      setEditProductId(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("✅ Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setFormData({ name: product.name, price: product.price, description: product.description, category: product.category, image: product.image });
    setEditProductId(product._id);
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>

      {/* Add / Edit Product Form */}
      <form onSubmit={editProductId ? updateProduct : addProduct}>
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required pattern="[0-9]*" />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="file" onChange={handleImageChange} accept="image/*" required={!editProductId} />
        <button type="submit">{editProductId ? "Update Product" : "Add Product"}</button>
      </form>

      {/* Product List */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img 
              src={product.image ? `http://localhost:5000${product.image}` : "/default-image.jpg"}  
              alt={product.name} 
            />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
