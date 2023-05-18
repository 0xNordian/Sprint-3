let products;

async function fetchProducts() {
  try {
    const response = await fetch('../products.json');
    const data = await response.json();
    products = data;
    console.log("Data fetched")
    console.log("Fetched products: ", products)
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
// function buy(id) {
//   // 1. Loop for to the array products to get the item to add to cart
//   // 2. Add found product to the cartList array
//   let res = JSON.stringify(products[id - 1]);
//   let product = JSON.parse(res);
//   //console.log("product: ", product);
//   products.forEach((item) => item.id === product.id ? cartList.push(item) : undefined);
//   //console.log('cartList after:', cartList);
//   calculateTotal();
//   generateCart();
//   productCount();
// }

function buy(id) {
  let res = JSON.stringify(products[id - 1]);
  let product = JSON.parse(res);
  products.forEach((item) => item.id === product.id ? cartList.push(item) : undefined);
  generateCart();
  calculateTotal();
  productCount();
}

// Exercise 2
function cleanCart() {
  //console.log(`cartList pre clean: ${JSON.stringify(cartList)}`)
  cart = [];
  cartList = [];
  productCount();
  calculateTotal();
  printCart();
  //console.log(`cartList post clean: ${JSON.stringify(cartList)}`)
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  const cartTotal = document.getElementById('total_price');
  cartTotal.innerText = '0';
  let totalPrice = 0;
  cart.forEach((item) => totalPrice += item.total);
  cartTotal.innerHTML = totalPrice;
  console.log(`cartList total price: ${totalPrice}`)
  return totalPrice;
}

// Exercise 4
function generateCart() {
  // Using the "cartlist" array that contains all the items in the shopping cart, 
  // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
  //if(cart.length === 0) cart = [];
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
    const deleteBtn = document.createElement('td');

    nameCell.textContent = item.name;
    priceCell.textContent = item.price;
    deleteBtn.classList = 'fa fa-trash';

    // Find the index of the corresponding item in the cart array
    const itemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
    deleteBtn.addEventListener('click', (event) => {
      removeFromCart(itemIndex);
    })

    console.log("cartList: ", cartList);
    console.log("cart: ", cart);


    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.value = item.qty;
    qtyInput.classList = 'qty-id';
    qtyInput.addEventListener('change', (event) => {
      const newQty = parseInt(event.target.value);


      // Update the quantity in the cart array
      if (itemIndex !== -1) {
        cart[itemIndex].qty = newQty;
        cart[itemIndex].total = item.price * newQty;
      }

      if (cartList[itemIndex]) {
        cartList[itemIndex].qty = newQty;
        cartList[itemIndex].total = item.price * newQty;
      }

      // Update the totalCell text content
      totalCell.textContent = item.price * newQty;
      productCount();
      calculateTotal();
    });

    qtyCell.appendChild(qtyInput);
    totalCell.textContent = item.total;

    newRow.appendChild(nameCell);
    newRow.appendChild(priceCell);
    newRow.appendChild(qtyCell);
    newRow.appendChild(totalCell);
    newRow.appendChild(deleteBtn);

    cartListTableBody.appendChild(newRow);
  });
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
  const product = products.find((item) => item.id === id);

  if (product) {
    const cartProduct = cart.find((cartItem) => cartItem.name === product.name);

    if (cartProduct) {
      cartProduct.qty++;
      cartProduct.total += product.price;
    } else {
      cart.push({
        name: product.name,
        price: product.price,
        qty: 1,
        total: product.price
      });
    }

    // Keep cartList in sync with cart
    cartList = cart.map((item) => ({ ...item }));
  }

  printCart();
  productCount();
  calculateTotal();
}

// Exercise 8
function removeFromCart(itemIndex) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    cartList = [];
    printCart();
    productCount();
  }
  calculateTotal();
}

function open_modal() {
  console.log("Open Modal");
  printCart();
  calculateTotal();
  productCount();
  console.log("cartList: ", cartList);
  console.log("cart: ", cart);
}

function productCount() {
  let productCount = 0;
  cart.forEach((item) => productCount += item.qty);
  const prodTotal = document.getElementById('count_product');
  prodTotal.innerText = productCount;
  console.log("productCount", productCount);
}

// function close_modal() {
//   console.log("Close Modal");
//   const modal = document.getElementById('modal');
//   modal.classList.remove('is-active');
// }