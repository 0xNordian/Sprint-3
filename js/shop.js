let products;

async function fetchProducts() {
  try {
    const response = await fetch('../products.json');
    const data = await response.json();
    products = data;

  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

fetchProducts();

 // Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
  let res = JSON.stringify(products[id - 1]);
  let product = JSON.parse(res);
  products.forEach((item) => item.id === product.id ? cartList.push(item) : undefined);
  console.log('Updated cartList:', cartList);
  calculateTotal();
  generateCart();
}

// Exercise 2
function cleanCart() {
  //console.log(`cartList pre clean: ${JSON.stringify(cartList)}`)
  cart = [];
  cartList = [];
  printCart();
  //console.log(`cartList post clean: ${JSON.stringify(cartList)}`)
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    let totalPrice = 0;
    cartList.forEach((item) => totalPrice += item.price);
    console.log(`cartList total price: ${totalPrice}`)
    return totalPrice;
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
  cart = [];
  cartList.forEach((item) => {
    let name = item.name;
    let existingItemIndex = cart.findIndex((cartItem) => cartItem.name === name);
    //console.log('existingItemIndex:', existingItemIndex);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].qty += 1;
      cart[existingItemIndex].total += item.price;
    } else {
      cart.push({ name: name, price: item.price, qty: 1, total: item.price });
    }
  });

  console.log('Cart:', cart); 
  printCart();
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
}

// Exercise 6
function printCart() {
  const cartListTableBody = document.getElementById('cart_list');
  cartListTableBody.innerHTML = '';

  const cartItems = {};

  cart.forEach((item) => {
      const name = item.name;
      if (!cartItems[name]) {
          cartItems[name] = { name, qty: item.qty, price: item.price, total: item.total };
      } else {
          cartItems[name].qty += item.qty;
      }
  });

  Object.values(cartItems).forEach((item) => {
      const newRow = document.createElement('tr');
      const nameCell = document.createElement('th');
      const priceCell = document.createElement('td');
      const qtyCell = document.createElement('td');
      const totalCell = document.createElement('td');

      nameCell.textContent = item.name;
      priceCell.textContent = item.price;
      qtyCell.textContent = item.qty;
      totalCell.textContent = item.total;

      newRow.appendChild(nameCell);
      newRow.appendChild(priceCell);
      newRow.appendChild(qtyCell);
      newRow.appendChild(totalCell);

      cartListTableBody.appendChild(newRow);
  });
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}

function open_modal(){
	console.log("Open Modal");
	printCart();
}