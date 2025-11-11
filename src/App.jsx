import { useEffect, useState } from 'react';
import ProductList from './Products/products';
import CartWindow from './Products/cartWindow';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 9)))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const addProductToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const productMap = new Map();
  for (const product of cart) {
    if (productMap.has(product.id)) {
      productMap.get(product.id).quantity += 1;
    } else {
      productMap.set(product.id, { ...product, quantity: 1 });
    }
  }
  const groupedCart = Array.from(productMap.values());

  const total = groupedCart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const totalItems = groupedCart.reduce((acc, product) => acc + product.quantity, 0);

  const increaseQuantity = (productId) => {
    const found = products.find((p) => p.id === productId);
    if (found) {
      setCart((prevCart) => [...prevCart, found]);
    }
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((p) => p.id === productId);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1);
        return newCart;
      }
      return prevCart;
    });
  };

  const removeProduct = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CartWindow
        totalItems={totalItems}
        cart={groupedCart}
        total={total}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeProduct={removeProduct}
      />

      <ProductList
        addProductToCart={addProductToCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        products={filteredProducts}
      />
    </>
  );
}

export default App;
