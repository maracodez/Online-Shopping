//display function
function showCart() {

  window.location.href = "cart.html";
}

function showCheckout() {
  window.location.href = "checkout.html"
}

function closeCart() {
  window.location.href = "index.html"
}

function closeCheckout() {
  window.location.href = "cart.html"
}

function closePayment() {
  window.location.href = "checkout.html"
}


//add-to-cart
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener('click', function() {
      const product = {
        id: this.dataset.productId,
        name: this.dataset.productName,
        image: this.dataset.productImage,
        price: parseFloat(this.dataset.productPrice)
      };
  
      //get existing cart data from localStorage or initialize an empty array
  
      let cart = JSON.parse(localStorage.getItem("cartModal")) || [] 
      // add the product to the cart array
      cart.push(product);
  
      //save the updated cart back to localStorage
      localStorage.setItem("cartModal", JSON.stringify(cart));
      alert("Added to cart")
      //update cart to display on page
      updateCart();
    });
  });

  //function to update the cart to display
  function updateCart() {
    const cart = JSON.parse(localStorage.getItem("cartModal"))|| [];
    const cartItemsContainer = document.getElementById("cartItems");
    const totalElement = document.getElementById("cartTotal")

    //clear current cart items
    cartItemsContainer.innerHTML = "";

    //initialize total price 
    let total = 0;

    //loop through the cart and display the items
    cart.forEach((item, index) => {
      const p = document.createElement("p");

      //set data attribute to identify item
      p.setAttribute("data-index", index)

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.style.width = "150px";  

      const text = document.createElement("p");
      text.textContent = `${item.name} - $${item.price}`;

      //create a remove btn
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-from-cart");
      removeBtn.addEventListener("click", function() {

        cart.splice(index, 1);

        localStorage.setItem("cartModal", JSON.stringify(cart));
        
        updateCart();

        alert("Are you sure you to remove want this item")
      })


      p.appendChild(img)
      p.appendChild(text)
      p.appendChild(removeBtn)
      cartItemsContainer.appendChild(p);

      //accumulate the total price
      total += item.price;
    });
    //display the total price 
    totalElement.textContent = `${total.toFixed(2)}`;
  }

  //automatically update the cart on the cart page load

  if(window.location.pathname.includes("cart.html")) {
    updateCart();
  }
})

//checkout
document.addEventListener("DOMContentLoaded", function() {
  //retrieve the cart from localstroage
  const cart = JSON.parse(localStorage.getItem("cartModal"))|| [];
  //calculate total price of d cart
  let subtotal = 0;
  cart.forEach(item => {
    subtotal =+ item.price;
  });

  //add delivery fee of $1
  const deliveryFee = 1.2;
  const Total = subtotal + deliveryFee;

  //display total price on page
  const subtotalPrice = document.getElementById("Subtotal-price");
  const deliveryFeeElement = document.getElementById("delivery-fee");
  const totalPrice = document.getElementById("checkoutTotal");

  subtotalPrice.textContent = subtotal.toFixed(2);
  deliveryFeeElement.textContent = deliveryFee
  totalPrice.textContent = Total.toFixed(2);

  //place order btn
  const placeOrderBtn = document.getElementById("Place-order");

  placeOrderBtn.addEventListener("click", function() {
    if (cart.length === 0) {
      alert("There is nothing in your cart to checkout.");
      return(window.location.href = "cart.html")
    }

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;

    if (!name || !address || !email) {
      alert('Please fill in all the required fields.');
      return;
    } else {
      alert("You have successful placed an order")
    }

    window.location.href = "./payment.html"
  })
})

//payment
document.addEventListener("DOMContentLoaded", function() {
  const payNowBtn = document.getElementById("pay-now");

  payNowBtn.addEventListener("click", function() {
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    if (!cardNumber || !expiryDate || !cvv) {
      alert('Please fill in all the payment details.');
      return;
    } else {
      alert("Payment Successful! Thank for your order")
    }

    localStorage.removeItem("cartModal");
    window.location.href = "index.html"
  })
})

//icon function 
function handleIconClick(url) {
  window.location.href = url;
}
