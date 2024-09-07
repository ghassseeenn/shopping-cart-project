class CartItem {
  constructor(id, name, price, quantity, liked = false) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.liked = liked;
  }

  getTotalPrice() {
    return this.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [
      new CartItem(1, 'Item 1', 20, 1),
      new CartItem(2, 'Item 2', 35, 1),
      new CartItem(3, 'Item 3', 50, 2),
    ];
    this.renderCartItems();
    this.updateTotalPrice();
  }

  renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    this.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <div class="controls">
          <div class="quantity-control">
            <button onclick="cart.changeQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="cart.changeQuantity(${item.id}, 1)">+</button>
          </div>
          <div>
            <span class="like-button ${item.liked ? 'liked' : ''}" onclick="cart.toggleLike(${item.id})">❤️</span>
            <button class="delete-button" onclick="cart.deleteItem(${item.id})">Delete</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
  }

  updateTotalPrice() {
    const totalPrice = this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
  }

  changeQuantity(itemId, amount) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + amount);
      this.renderCartItems();
      this.updateTotalPrice();
    }
  }

  toggleLike(itemId) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.liked = !item.liked;
      this.renderCartItems();
    }
  }

  deleteItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.renderCartItems();
    this.updateTotalPrice();
  }
}

const cart = new ShoppingCart();
