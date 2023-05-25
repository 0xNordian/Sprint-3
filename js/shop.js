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

async function initialize() {
  await fetchProducts();
}

initialize();


// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
  let res = JSON.stringify(products[id - 1]);
  let product = JSON.parse(res);
  products.forEach((item) => item.id === product.id ? cartList.push(item) : undefined);
  generateCart();
  calculateTotal();
  productCount();
  applyPromotionsCart();
}

// Exercise 2
function cleanCart() {
  removeAllInputs();
  cart = [];
  cartList = [];
  productCount();
  calculateTotal();
  printCart();
  printInput();
  updateInputs();
}

// Exercise 3
function calculateTotal() {
  const cartTotal = document.getElementById('total_price');
  cartTotal.innerText = '0';
  let totalPrice = 0;
  cart.forEach((item) => totalPrice += parseFloat(item.total));
  cartTotal.innerHTML = `€${totalPrice.toFixed(2)}`;
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
  let promotionApplied = false;
  cart.forEach((item) => {
    console.log("Item offer: ", item.offer === true);
    if (item.offer && item.qty >= item.offer.number) {
      console.log("Offer available: ", item.offer.number);
      let subtotal = item.price * item.qty;
      let discount = (subtotal * item.offer.percent) / 100;
      let finalPrice = subtotal - discount;
      item.total = finalPrice;

      promotionApplied = true;
    } else {
      console.log("No offer");
    }
  });
  return promotionApplied;
}

// Exercise 6
function printCart() {
  const cartListTableBody = document.getElementById('cart_list');
  cartListTableBody.innerHTML = '';

  const cartItems = {};

  cart.forEach((item) => {
    const name = item.name;
    if (!cartItems[name]) {
      cartItems[name] = { id: item.id, name, qty: item.qty, price: item.price, total: item.total, totalDisc: 0, offer: item.offer };
    } else {
      cartItems[name].qty += item.qty;
    }
  });
  Object.values(cartItems).forEach((item) => {
    const newRow = document.createElement('tr');
    const nameCell = document.createElement('th');
    const priceCell = document.createElement('td');
    priceCell.classList = 'text-center';
    const qtyCell = document.createElement('td');
    qtyCell.classList = 'text-center';
    const subTotalCell = document.createElement('td');
    subTotalCell.classList = 'text-center';
    const prodTotalCell = document.createElement('td');
    prodTotalCell.classList = 'text-center';
    const deleteBtn = document.createElement('td');
    deleteBtn.classList = 'text-center';
    const discountCell = document.createElement('td');
    discountCell.classList = 'text-center';

    nameCell.textContent = item.name;
    priceCell.textContent = item.price;

    const itemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa fa-trash';
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.addEventListener('click', (event) => {
      removeFromCart(itemIndex);
    })

    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.value = item.qty;
    qtyInput.classList = 'qty-id text-center';
    qtyInput.addEventListener('change', (event) => {
      const newQty = parseInt(event.target.value);
      console.log("event inside qtyInput: ", event);

      if (itemIndex !== -1) {
        cart[itemIndex].qty = newQty;
        cart[itemIndex].total = (item.price * newQty).toFixed(2);
      }

      if (cartList[itemIndex]) {
        cartList[itemIndex].qty = newQty;
        cartList[itemIndex].total = (item.price * newQty).toFixed(2);
      }
      if (cart[itemIndex].offer) {
        console.log("A promotion was applied.");
        subTotalCell.style.textDecoration = 'line-through';
        subTotalCell.style.color = 'red';
        subTotalCell.textContent = (item.price * newQty).toFixed(2);

        if (!discountCell.querySelector('.fa-piggy-bank')) {
          const discountIcon = document.createElement('i');
          discountIcon.className = 'fa fa-piggy-bank';
          discountCell.appendChild(discountIcon);
        }
      } else {
        console.log("No promotions were applied.");
        subTotalCell.textContent = (item.price * newQty).toFixed(2);
      }
      productCount();
      calculateTotal();
      applyPromotionsCart();
      printInput();
      prodTotalCell.textContent = item.totalDisc;
    });

    qtyCell.appendChild(qtyInput);
    subTotalCell.textContent = parseFloat(item.total).toFixed(2);

    newRow.appendChild(nameCell);
    newRow.appendChild(priceCell);
    newRow.appendChild(qtyCell);
    newRow.appendChild(subTotalCell);
    newRow.appendChild(prodTotalCell);
    newRow.appendChild(deleteBtn);
    newRow.appendChild(discountCell);

    cartListTableBody.appendChild(newRow);
    console.log("cart with offer: ", cart[itemIndex].offer);
  });
}

function printInput() {
  cart.forEach((item) => {
    const inputFieldsDiv = document.getElementById(`input-fields-${item.id}`);
    if (inputFieldsDiv === null) {
      return;
    }
    inputFieldsDiv.innerHTML = '';

    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.value = item.qty;
    qtyInput.id = `lp-input-id-${item.id}`;
    qtyInput.style.width = '45px';
    qtyInput.style.borderRadius = '10px';
    qtyInput.style.textAlign = 'center';
    qtyInput.style.border = '1px solid #ccc';
    qtyInput.style.height = '40px';
    qtyInput.style.marginLeft = '.8rem';

    qtyInput.addEventListener('change', (event) => {
      const newQty = parseInt(event.target.value);
      if (newQty >= 0) {
        item.qty = newQty;
      }
      productCount();
      calculateTotal();
    });
    inputFieldsDiv.appendChild(qtyInput);
  });
  updateInputs();
  productCount();
  calculateTotal();
};

function updateInputs() {
  cart.forEach((item) => {
    const itemIndexUI = cart.findIndex((cartItem) => cartItem.name === item.name);
    const input = document.getElementById(`lp-input-id-${item.id}`);
    if (input) {
      input.value = item.qty;
    }
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
        id: product.id,
        name: product.name,
        price: product.price,
        type: product.type,
        qty: 1,
        total: product.price,
        totalDisc: 0,
        offer: product.offer,
      });
    }
    cartList = cart.map((item) => ({ ...item }));
  }
  applyPromotionsCart();
  printCart();
  printInput();
  productCount();
  calculateTotal();
  console.log("cartList: ", cartList);
  console.log("cart: ", cart);
}

// Exercise 8
function removeFromCart(itemIndex) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
  if (itemIndex !== -1) {
    const itemId = cart[itemIndex].id;
    cart.splice(itemIndex, 1);
    cartList = [];
    printCart();
    printInput();
    productCount();
    removeInput(itemId);
  }
  calculateTotal();
}

function removeInput(itemId) {
  const inputElement = document.getElementById(`lp-input-id-${itemId}`);
  if (inputElement) {
    inputElement.remove();
  }
}

function removeAllInputs() {
  cart.forEach((item) => {
    const itemId = item.id;
    removeInput(itemId);
  });
}

// function discProd() {
//   cart.forEach((item) => {
//     const itemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
//     if (cart[itemIndex].offer) {
//       console.log("A promotion was applied.");
//       subTotalCell.style.textDecoration = 'line-through';
//       subTotalCell.style.color = 'red';
//     }
//   });
// }

function open_modal() {
  printCart();
  calculateTotal();
  productCount();
  applyPromotionsCart();
  //discProd();
}

function productCount() {
  let productCount = 0;
  cart.forEach((item) => productCount += item.qty);
  const prodTotal = document.getElementById('count_product');
  prodTotal.innerText = productCount;
}