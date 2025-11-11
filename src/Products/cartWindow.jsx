import { useState } from 'react';
import { FaShoppingCart, FaFrown } from 'react-icons/fa';
import styles from './card.module.css';

const CartWindow = ({
  cart,
  total,
  totalItems,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCart = () => setIsOpen(!isOpen);

  const cartDrawerClass = `${styles.cartDrawer} ${isOpen ? styles.open : ''}`;

  return (
    <>
      <div className={styles.cart}>
        <FaShoppingCart />
        <p>Cart: ({totalItems})</p>
        <span>Total: ${total.toFixed(2)}</span>
        <button onClick={toggleCart} className={styles.button}>
          Go to Cart
        </button>
      </div>

      <div className={cartDrawerClass}>
        <div className={styles.cartHeader}>
          <FaShoppingCart />
          <h3>Your cart</h3>
          <button onClick={toggleCart} className={styles.closeButton}>
            ✖
          </button>
        </div>

        <div className={styles.total}>
          <h3>Products: ({totalItems})</h3>
          <h4>Total: ${total.toFixed(2)}</h4>
          <button className={styles.button}>Checkout</button>
        </div>

        {cart.length === 0 ? (
          <>
            <p>Your cart is empty.</p>
            <FaFrown />
          </>
        ) : (
          <>
            {cart.map((product) => (
              <div key={product.id}>
                <div className={styles.imgPriceList}>
                  <img src={product.images} alt={product.title} className={styles.imageCart} />
                  <p>{product.title}</p>
                </div>
                <p>${product.price} each</p>
                <div className={styles.qtyBox}>
                  <button onClick={() => decreaseQuantity(product.id)} className={styles.qtyButton}>
                    -
                  </button>
                  <span className={styles.qtyNumber}>{product.quantity}</span>
                  <button onClick={() => increaseQuantity(product.id)} className={styles.qtyButton}>
                    +
                  </button>
                </div>
                <button onClick={() => removeProduct(product.id)} className={styles.removeButton}>
                  Remove
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      {isOpen && <div className={styles.overlay} onClick={toggleCart}></div>}
    </>
  );
};

export default CartWindow;
