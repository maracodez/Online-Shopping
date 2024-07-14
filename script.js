let cart = [];
let totalAmount = 0;

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("cartLink").addEventListener("click", function(event) {
    event.preventDefault();
    showCart();
  });

  document.getElementById("checkoutForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateForm()) {
      placeOrder();
    }
  })
});

function addToCart(image, product, price) {
  let existingProduct = cart.find(item => item.product === product);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ image, product, price, quantity: 1});
  }
  totalAmount += price;
  updateCart();
  alert("Product added to cart");
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const p = document.createElement('p');
    p.innerHTML = `<img src="${item.image}" alt="${item.product}"/> 
    <p>${item.product}</p> 
    <p>$${item.price}</p>
    <p>Quantity: ${item.quantity}</p>
    <button onclick="removeFromCart('${item.product}')">Remove</button>`;
    cartItems.appendChild(p);
  });

  document.getElementById('cartTotal').innerText = totalAmount.toFixed(2)
}

function removeFromCart(product) {
  let itemIndex = cart.findIndex(item => item.product === product);
  if (itemIndex !== -1) {
    totalAmount -= cart[itemIndex].price * cart[itemIndex].quantity;
    cart.splice(itemIndex, 1);
    updateCart();
  }
}

function showCart() {

  document.getElementById('cartModal').style.display = 'block';
}

function closeCart() {

  document.getElementById('cartModal').style.display = 'none';
}

function continueShopping() {
  closeCart();
  closeCheckout();

  document.getElementsByClassName('main').style.display = 'block';
}

function showCheckout() {
  closeCart();

  document.getElementById('checkoutPage').style.display = 'block';
  const checkoutItems = document.getElementById('checkoutItems');
  checkoutItems.innerHTML = '';
  cart.forEach(item => {
    const p = document.createElement('p');
    p.innerHTML = `
    <p>${item.product} - $${item.price} * ${item.quantity}</p> 
    `
    checkoutItems.appendChild(p);
  });

  document.getElementById('checkoutTotal').innerHTML = totalAmount.toFixed(2);
}

function closeCheckout() {

  document.getElementById('checkoutPage').style.display = 'none';
}

function validateForm() {
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const email = document.getElementById('email').value;
  if (!name || !address || !email) {
    alert("Please fill in all fields.");
    return false;
  }
  return true;
}

function placeOrder() {
  alert("Order placed successfully");
  cart = [];
  totalAmount = 0;
  updateCart();
  hideCheckout();
}