function Cart(keyToLocalStorage) {
  const cart = {
    cartItems: undefined,
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(keyToLocalStorage));

      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1',
          },
          {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2',
          },
        ];
      }
    },
    saveToLocalStorage() {
      localStorage.setItem(keyToLocalStorage, JSON.stringify(this.cartItems));
    },
    addProductToCart(productId) {
      let matchingItem;
      this.cartItems.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
      });
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId,
          quantity: 1,
          deliveryOptionId: '1',
        });
      }
      this.saveToLocalStorage();
    },
    removeProductFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((product) => {
        if (product.productId !== productId) {
          newCart.push(product);
        }
      });
      this.cartItems = newCart;
      this.saveToLocalStorage();
    },
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToLocalStorage();
    },
  };
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);

console.log(businessCart);
