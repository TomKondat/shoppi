import {
  addNewProduct,
  editProduct,
  getProducts,
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  getFeedbacksByProductId,
  addNewFeedback,
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
const logoutBtn = document.getElementById("logoutBtn");

const openRegisterModalBtn = document.getElementById("openRegisterModal");
const registerOverlay = document.getElementById("register-overlay");
const registerCloseBtn = document.getElementById("register-close-btn");
const registerSubmit = document.getElementById("register-form");
const forgotPasswordBtn = document.getElementById("forgot-form");
const resetPasswordForm = document.getElementById("reset-password");

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
const createFeedbackEl = (feedback) => {
  const feedbackEl = document.createElement("div");
  feedbackEl.className = "feedback";
  const feedbackDate = new Date(feedback.createdAt).toLocaleString("en-US", {
    hour12: false,
  });

  feedbackEl.innerHTML = `
  <div >
    <p><strong>${feedback.author.username} </strong>: ${feedback.review}(Rating ${feedback.rating}).</p>
      <p><strong>Posted at: </strong>: ${feedbackDate}</p>
  </div>
  `;
  return feedbackEl;
};
const handleToggleFeedback = (e) => {
  const id = e.target.id.split("_")[1];
  const feedbackDivEl = document.getElementById(`feedbackDiv_${id}`);
  console.log(id);
  console.log(feedbackDivEl);
  getFeedbacksByProductId(id).then((feedbacks) => {
    console.log(feedbacks);
    render(feedbackDivEl, feedbacks.docs, createFeedbackEl);
  });
  if (e.target.parentElement.children[5].style.display == "block")
    e.target.parentElement.children[5].style.display = "none";
  else e.target.parentElement.children[5].style.display = "block";
};

const handleAddNewFeedback = (e) => {
  e.preventDefault();
  const productId = e.target.id.split("_")[1];
  const feedback = e.target.children[0].value;
  const rating = e.target.children[1].value;

  console.log(
    `productId: ${productId} feedback: ${feedback} rating: ${rating}`
  );

  addNewFeedback(productId, rating, feedback).then((data) => {
    console.log(data);
    getFeedbacksByProductId(productId).then((feedbacks) => {
      render(
        document.getElementById(`feedbackDiv_${productId}`),
        feedbacks.docs,
        createFeedbackEl
      );
    });
  });
  e.target.children[0].value = "";
  e.target.children[1].value = "";
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
      render(rootEl, products.docs, createCardEl)
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
  imgEl.src = `http://127.0.0.1:8000/${productObj.image}`;
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

  //form for adding feedback
  const addFeedbackFormEl = document.createElement("form");
  addFeedbackFormEl.id = `addFeedbackForm_${productObj._id}`;
  addFeedbackFormEl.addEventListener("submit", handleAddNewFeedback);

  const addFeedbackInputEl = document.createElement("input");
  addFeedbackInputEl.placeholder = "Add feeback";
  addFeedbackInputEl.type = "text";
  addFeedbackFormEl.append(addFeedbackInputEl);

  const addRatingInputEl = document.createElement("input");
  addRatingInputEl.placeholder = "Add rating";
  addRatingInputEl.type = "number";
  addFeedbackFormEl.append(addRatingInputEl);

  const submitFeedbackInputEl = document.createElement("input");
  submitFeedbackInputEl.value = "Add Feedback";
  submitFeedbackInputEl.type = "submit";
  addFeedbackFormEl.append(submitFeedbackInputEl);

  //form end

  const feedbackBtnEl = document.createElement("button");
  feedbackBtnEl.id = `feedback_${productObj._id}`;
  feedbackBtnEl.innerHTML = "Feedbacks";
  feedbackBtnEl.className = "feedbacks-btn";
  feedbackBtnEl.addEventListener("click", handleToggleFeedback);
  cardEl.append(feedbackBtnEl);
  const feedbackDivEl = document.createElement("div");
  feedbackDivEl.id = `feedbackDiv_${productObj._id}`;
  feedbackDivEl.style.display = "none";

  cardEl.append(feedbackDivEl);
  cardEl.append(addToCartBtn);
  cardEl.append(addFeedbackFormEl);
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
  const image =
    e.target.children[3].files[0] == ""
      ? undefined
      : e.target.children[3].files[0];
  addNewProduct(name, price, cat, image)
    .then((data) => {
      console.log(data);
      getProducts().then((products) =>
        render(rootEl, products.docs, createCardEl)
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
getProducts().then((products) => render(rootEl, products.docs, createCardEl));

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
  let email = e.target.children[1].value;
  let password = e.target.children[2].value;
  login(email, password);
  email = "";
  password = "";
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
  let username = e.target.children[1].value;
  let email = e.target.children[2].value;
  let age = e.target.children[3].value;
  let password = e.target.children[4].value;
  let confirmPassword = e.target.children[5].value;
  register(username, email, age, password, confirmPassword);
  username = "";
  email = "";
  age = "";
  password = "";
  confirmPassword = "";
  registerOverlay.style.display = "none";
};

const handleLogout = () => {
  logout();
  getProducts().then((products) => render(rootEl, products.docs, createCardEl));
};

const handleForgotPassword = (e) => {
  e.preventDefault();
  resetPasswordForm.style.display = "block";
  let email = e.target.children[1].value;
  console.log(`email: ${email}`);
  forgotPassword(email);
};

const handleResetPassowrd = (e) => {
  e.preventDefault();
  resetPasswordForm.style.display = "none";
  let token = e.target.children[0].value;
  let password = e.target.children[1].value;
  let confirmPassword = e.target.children[2].value;
  console.log(
    `token: ${token} password: ${password} confirmPassword: ${confirmPassword}`
  );
  resetPassword(token, password, confirmPassword);
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
logoutBtn.addEventListener("click", handleLogout);
openRegisterModalBtn.addEventListener("click", handleDisplayRegisterModal);
registerCloseBtn.addEventListener("click", handleRegisterModalCloseBtn);
registerOverlay.addEventListener("click", handleRegisterModalOverlay);
registerSubmit.addEventListener("submit", handleRegisterSubmit);
forgotPasswordBtn.addEventListener("submit", handleForgotPassword);
resetPasswordForm.addEventListener("submit", handleResetPassowrd);
