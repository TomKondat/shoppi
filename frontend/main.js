import {
  addNewProduct,
  editProduct,
  getProducts,
  login,
  register,
} from "./apiServices.js";

const rootEl = document.getElementById("root");
const searchBtn = document.querySelector("header div:nth-child(2) button");
/* const searchForm = document.querySelector('header div:nth-child(2) form') */
const addProductForm = document.getElementById("add-product");
const inputSearch = document.getElementById("inputSearch");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.querySelector(".modal-close-btn");
const openLoginModalBtn = document.getElementById("openLoginModal");
const loginOverlay = document.getElementById("login-overlay");
const loginCloseBtn = document.getElementById("login-close-btn");
const loginSubmit = document.getElementById("login-form");
const loginUsername = document.getElementById("login-username");

const openRegisterModalBtn = document.getElementById("openRegisterModal");
const registerOverlay = document.getElementById("register-overlay");
const registerCloseBtn = document.getElementById("register-close-btn");
const registerSubmit = document.getElementById("register-form");

let shoppingCart = [];
const handleAddProductToCart = (e) => {
  const id = e.target.id.split("_")[1];
  ///1 the product is in cart ---> update the quantity
  let alreadyInCart = false;
  shoppingCart = shoppingCart.map((product) => {
    if (product.id === id) {
      product.quantity++;
      alreadyInCart = true;
    }

    return product;
  });
  if (alreadyInCart) {
    return;
  }
  ///2 The product is not in cart ----> find it in products and add to cart
  const product = products.find((product) => product.id === id);
  const cartProduct = { ...product };
  cartProduct.quantity = 1;
  shoppingCart.push(cartProduct);
};
const handleToggleEditMode = (e) => {
  //const id = e.target.id.split("_")[1]
  console.log(e.target.parentElement.children[3]);
  if (e.target.parentElement.children[3].style.display == "flex")
    e.target.parentElement.children[3].style.display = "none";
  else e.target.parentElement.children[3].style.display = "flex";
};
const handleSubmitEditProduct = (e) => {
  e.preventDefault();
  console.log(e.target.id);
  const id = e.target.id.split("_")[2];
  const name = e.target.children[0].value;
  const price = e.target.children[1].value;
  editProduct(id, name, price).then(() => {
    console.log(`id: ${id}   name${name}   price: ${price}`);

    getProducts().then((products) =>
      render(rootEl, products.products, createCardEl)
    );
  });
};

////PRODUCT CARD LOGIC
const createCardEl = (productObj) => {
  const cardEl = document.createElement("div");
  cardEl.className = "card";

  const editBtnEl = document.createElement("button");
  editBtnEl.id = `edit_${productObj._id}`;
  editBtnEl.innerHTML = "edit";
  editBtnEl.className = "edit-btn";
  editBtnEl.addEventListener("click", handleToggleEditMode);

  const imgEl = document.createElement("img");
  imgEl.src = productObj.image;
  imgEl.alt = productObj.name;
  cardEl.append(imgEl);
  cardEl.innerHTML += `<div class="card-body">
         <h5 class="card-title">${productObj.name}</h5>
        <p class="card-text">Price ${productObj.price}</p>
       
       </div>`;
  const editFormEl = document.createElement("form");
  editFormEl.id = `edit_form_${productObj._id}`;

  const editNameInputEl = document.createElement("input");
  editNameInputEl.value = productObj.name;
  editNameInputEl.placeholder = "edit name";
  editNameInputEl.type = "text";
  editFormEl.append(editNameInputEl);

  const editPriceInputEl = document.createElement("input");
  editPriceInputEl.value = productObj.price;
  editPriceInputEl.placeholder = "edit price";
  editPriceInputEl.type = "number";
  editFormEl.append(editPriceInputEl);

  const editSubmitInputEl = document.createElement("input");
  editSubmitInputEl.value = "Save Changes";
  editSubmitInputEl.type = "submit";
  editFormEl.addEventListener("submit", handleSubmitEditProduct);
  editFormEl.append(editSubmitInputEl);
  cardEl.append(editFormEl);
  const addToCartBtn = document.createElement("button");
  addToCartBtn.className = "btn btn-primary";
  addToCartBtn.id = `btn_${productObj._id}`;
  addToCartBtn.innerHTML = `Buy ${productObj.name} Now!`;
  addToCartBtn.addEventListener("click", handleAddProductToCart);
  cardEl.append(addToCartBtn);
  cardEl.prepend(editBtnEl);
  return cardEl;
};
//add or remove product from cart
const handleChangeQuantity = (e) => {
  ///1 extract from the event the product id
  const id = e.target.id.split("_")[1];
  ///2 find product by its id in shopping cart
  const product = shoppingCart.find((product) => product.id === id);
  ///3 check the requested action acoording to btn innerHtml
  const action = e.target.innerHTML;
  console.log(action);
  if (action === "+") product.quantity++;
  else if (action === "-" || e.target.value == 0) {
    if (product.quantity == 1) {
      confirm("Are your sure you want to remove this product?");
      shoppingCart = shoppingCart.filter((product) => product.id !== id);
    }
    product.quantity--;
  } else {
    product.quantity = e.target.value;
  }
  //re render after change
  const cartTableEl = document.getElementById("shopping-cart-list");
  render(cartTableEl, shoppingCart, createCardShoppingCartProductTrEl);
};
const createCardShoppingCartProductTrEl = (productObj) => {
  //creating tr element
  const trEl = document.createElement("tr");
  trEl.className = "cart-item-row";
  //td 1
  let tdEl = document.createElement("td");
  tdEl.innerHTML = `<h3>${productObj.name}</h3>`;
  trEl.append(tdEl);
  //td 2
  tdEl = document.createElement("td");

  const inputEl = document.createElement("input");
  inputEl.type = "number";
  inputEl.min = 0;
  inputEl.max = 10;

  inputEl.value = productObj.quantity;
  inputEl.id = `input_${productObj._id}`;
  addEventListener("change", handleChangeQuantity);
  tdEl.append(inputEl);
  //minus btn
  const btnMinus = document.createElement("button");
  btnMinus.innerHTML = "-";
  btnMinus.id = `btn-minus_${productObj._id}`;
  btnMinus.addEventListener("click", handleChangeQuantity);
  tdEl.prepend(btnMinus);
  //plus btn
  const btnPlus = document.createElement("button");
  btnPlus.innerHTML = "+";
  btnPlus.id = `btn-plus_${productObj._id}`;
  btnPlus.addEventListener("click", handleChangeQuantity);
  tdEl.append(btnPlus);

  trEl.append(tdEl);
  return trEl;
};
const handleAddProduct = (e) => {
  e.preventDefault();
  const name = e.target.children[0].value;
  const price = e.target.children[1].value;
  const cat = e.target.children[2].value;
  const image = e.target.children[3].value;
  addNewProduct(name, price, cat, image)
    .then((data) => {
      console.log(data);
      getProducts().then((products) =>
        render(rootEl, products.products, createCardEl)
      );
    })
    .catch((err) => console.log(err.message));
};
const addContent = (elToAppend, contentElToBeAdded) =>
  elToAppend.append(contentElToBeAdded);

const render = (elToRenderIn, objArr, createCard) => {
  elToRenderIn.innerHTML = "";
  objArr.map((el) => addContent(elToRenderIn, createCard(el)));
};
getProducts().then((products) =>
  render(rootEl, products.products, createCardEl)
);

/* const handleSearchProducts = ()=>{
  const searchTerm = inputSearch.value
  const filteredArr = products.filter(product => product.name.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase()) )
  render(rootEl, filteredArr, createCardEl)
} */
const handleSearchOnInput = (e) => {
  const searchTerm = e.target.value;
  console.log(searchTerm);
  const filteredArr = products.filter((product) =>
    product.name.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase())
  );
  render(rootEl, filteredArr, createCardEl);
};
const handleSearchOnSubmit = (e) => {
  e.preventDefault();
  console.log(e.target.children);
  const searchTerm = e.target.children[0].value;
  const filteredArr = products.filter((product) =>
    product.name.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase())
  );
  render(rootEl, filteredArr, createCardEl);
};

////MODAL LOGIC
const handleShowModal = () => {
  const modalOverlayEl = document.querySelector(".overlay");
  modalOverlayEl.style.display = "flex";
  modalOverlayEl.style.animation = "fade-in 500ms forwards";
  const cartTableEl = document.getElementById("shopping-cart-list");
  render(cartTableEl, shoppingCart, createCardShoppingCartProductTrEl);
};
const handleCloseModal = () => {
  const modalOverlayEl = document.querySelector(".overlay");
  modalOverlayEl.style.animation = "fade-out 500ms  forwards";
  // modalOverlayEl.style.display = 'none'
  setTimeout(() => {
    modalOverlayEl.style.display = "none";
  }, 500);
};

const handleDisplayLoginModal = () => {
  loginOverlay.style.display = "flex";
};

const handleLoginModalCloseBtn = () => {
  loginOverlay.style.display = "none";
};

const handleLoginModalOverlay = (e) => {
  if (e.target === loginOverlay) {
    loginOverlay.style.display = "none";
  }
};

const handleLoginSubmit = (e) => {
  e.preventDefault();
  const username = e.target.children[3].value;
  const email = e.target.children[1].value;
  const password = e.target.children[2].value;
  login(email, password);
  email.value = "";
  password.value = "";
  loginOverlay.style.display = "none";
};

const handleDisplayRegisterModal = () => {
  registerOverlay.style.display = "flex";
};

const handleRegisterModalCloseBtn = () => {
  registerOverlay.style.display = "none";
};

const handleRegisterModalOverlay = (e) => {
  if (e.target === registerOverlay) {
    registerOverlay.style.display = "none";
  }
};

const handleRegisterSubmit = (e) => {
  e.preventDefault();
  const username = e.target.children[1].value;
  const email = e.target.children[2].value;
  const age = e.target.children[3].value;
  const password = e.target.children[4].value;
  const confirmPassword = e.target.children[5].value;
  register(username, email, age, password, confirmPassword);
  username.value = "";
  email.value = "";
  age.value = "";
  password.value = "";
  confirmPassword.value = "";
  registerOverlay.style.display = "none";
};

// addNewProduct(name, price, cat, image).then(() => {
//   getProducts().then((products) =>
//     render(rootEl, products.products, createCardEl)
//   );
// });

/* searchForm.addEventListener('submit', handleSearchOnSubmit)
 */ /* inputSearch.addEventListener('input', handleSearchOnInput) */
/* searchBtn.addEventListener('click', handleSearchProducts) */

openModalBtn.addEventListener("click", handleShowModal);
closeModalBtn.addEventListener("click", handleCloseModal);
addProductForm.addEventListener("submit", handleAddProduct);
openLoginModalBtn.addEventListener("click", handleDisplayLoginModal);
loginCloseBtn.addEventListener("click", handleLoginModalCloseBtn);
loginOverlay.addEventListener("click", handleLoginModalOverlay);
loginSubmit.addEventListener("submit", handleLoginSubmit);

openRegisterModalBtn.addEventListener("click", handleDisplayRegisterModal);
registerCloseBtn.addEventListener("click", handleRegisterModalCloseBtn);
registerOverlay.addEventListener("click", handleRegisterModalOverlay);
registerSubmit.addEventListener("submit", handleRegisterSubmit);
