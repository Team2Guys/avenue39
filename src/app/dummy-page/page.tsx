'use client';
import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '@redux/store'; // Adjust according to your path
import { addItem, removeItem, updateItemQuantity } from '@cartSlice/index'; // Adjust according to your path
import { CartItem } from '@cartSlice/types'; // Adjust according to your path

const MyComponent = () => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);

  const exampleProduct: CartItem = {
    id: 3,
    image: {
      src: '/_next/static/media/imageeee.df4aeaf9.png',
      height: 489,
      width: 385,
      blurDataURL:
        '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimageeee.df4aeaf9.png&w=6&q=70',
      blurWidth: 6,
      blurHeight: 8,
    },
    name: 'Sparta Coffee Table',
    price: 200,
    discount: 300,
    sale: '50%',
    reviews: 0,
    productType: 'Dinner',
    quantity: 1,
  };

  const addProductToCart = () => {
    dispatch(addItem(exampleProduct));
  };

  const removeProductFromCart = (id: number) => {
    dispatch(removeItem(id));
  };

  const updateProductQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      // Prevent setting quantity to 0 or negative
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };

  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} -DHR.${item.price * item.quantity} (x{item.quantity})
            {item.discount && (
              <div>
                Discounted Price: {(item.discount * item.quantity).toFixed(2)}
              </div>
            )}
            <button
              onClick={() => updateProductQuantity(item.id, item.quantity + 1)}
              className="bg-green-500"
            >
              Increase Quantity
            </button>
            <button
              onClick={() => updateProductQuantity(item.id, item.quantity - 1)}
            >
              Decrease Quantity
            </button>
            <button
              onClick={() => removeProductFromCart(item.id)}
              className="bg-red-500"
            >
              Remove from Cart
            </button>
          </li>
        ))}
      </ul>
      <button onClick={addProductToCart}>Add Example Product to Cart</button>
    </div>
  );
};

export default MyComponent;
