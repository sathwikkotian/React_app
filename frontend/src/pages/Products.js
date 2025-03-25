import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      console.log("Fetched Products:", data); // Debugging
      setProducts(data.products); // ✅ Extracting the correct array
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Product added to cart ✅");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div style={{ marginTop: "80px", padding: "20px" }}>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {products.map((product) => (
            <div key={product._id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
              
              {/* Display product image */}
              <img 
                src={product.image ? `http://localhost:5000${product.image}` : "/default-image.jpg"}  
                alt={product.name} 
                style={{ 
                  width: "100%", 
                  height: "200px", 
                  objectFit: "cover", 
                  borderRadius: "5px" 
                }}
                onError={(e) => (e.target.src = "/default-image.jpg")} // Handle broken images
              />

              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => addToCart(product._id)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
