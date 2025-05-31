import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const localCart = localStorage.getItem("cartItems");
    return localCart ? JSON.parse(localCart) : {};
  });

  const url = "http://localhost:4001";
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [product_list, setProductList] = useState([]);

  // Update localStorage on cart change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = product_list.find((p) => p._id === id);
      return item ? total + item.price * qty : total;
    }, 0);
  };

  const fetchProductList = async () => {
    const res = await axios.get(url + "/api/product/list");
    setProductList(res.data.data);
  };

  const loadCartData = async (tk) => {
    try {
      const res = await axios.post(url + "/api/cart/get", {}, { headers: { token: tk } });
      setCartItems(res.data.cartData);
    } catch (err) {
      console.error("Failed to load cart from backend:", err);
    }
  };

  useEffect(() => {
    fetchProductList();
    if (token) {
      loadCartData(token);
    }
  }, [token]);

  const contextValue = {
    product_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
