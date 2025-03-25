import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/cart/update",
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCart(); // Refresh cart after update
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.product._id} className="cart-item">
            <img
              className="cart-image"
              src={item.product.image ? `http://localhost:5000${item.product.image}` : "/default-image.jpg"}
              alt={item.product.name}
              onError={(e) => (e.target.src = "/default-image.jpg")}
            />
            <div>
              <h4>{item.product.name}</h4>
              <p>₹{item.product.price} x {item.quantity}</p>
            </div>
            <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>
              {item.quantity > 1 ? "Decrease Quantity" : "Remove"}
            </button>
            <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
              Increase Quantity
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
