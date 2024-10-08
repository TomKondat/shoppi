const getProducts = async (query = "") => {
  const url = `http://localhost:8000/api/shoppi/products/${query}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

const getFeedbacksByProductId = async (productId) => {
  const config = {
    withCredentials: true,
    method: "get",
  };
  const url = `http://localhost:8000/api/shoppi/products/${productId}/feedbacks`;

  const { data } = await axios(url, config);
  console.log(data);

  return data;
};

const addNewFeedback = async (productId, rating, review) => {
  const config = {
    data: { product: productId, rating, review },
    withCredentials: true,
    method: "post",
  };
  const url = `http://localhost:8000/api/shoppi/feedbacks`;

  const { data } = await axios(url, config);
  console.log(data);

  return data;
};

const addNewProduct = async (name, price, cat, image) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("cat", cat);
  if (image) {
    formData.append("image", image);
  }
  const config = {
    data: formData,
    withCredentials: true,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const url = `http://localhost:8000/api/shoppi/products`;
  const { data } = await axios(url, config);
  console.log(data);
  return data;
};
const editProduct = async (id, name, price) => {
  const url = `http://localhost:8000/api/shoppi/products/${id}`;
  try {
    const res = await axios.patch(url, {
      name,
      price,
    });
    console.log(res);
  } catch (err) {
    console.log(err.message);
  }
};

const login = async (email, password) => {
  const config = {
    withCredentials: true,
    method: "post",
    data: { email, password },
  };
  const url = `http://localhost:8000/api/shoppi/users/login`;
  try {
    const res = await axios(url, config);
    console.log(res);
  } catch (err) {
    console.log(err.message);
  }
};

const logout = async () => {
  const config = {
    withCredentials: true,
    method: "delete",
  };
  const url = `http://localhost:8000/api/shoppi/users/logout`;
  try {
    const res = await axios(url, config);
    if (res.data.status === "success") alert("Logged out successfully");
    console.log(res);
  } catch (err) {
    console.log(err.message);
  }
};

const register = async (username, email, age, password, confirmPassword) => {
  const config = {
    withCredentials: true,
    method: "post",
    data: { username, email, age, password, confirmPassword },
  };
  const url = `http://localhost:8000/api/shoppi/users/register`;
  try {
    const res = await axios(url, config);
    console.log(res);
  } catch (err) {
    console.log(err.message);
  }
};

const forgotPassword = async (email) => {
  const config = {
    method: "post",
    data: { email },
  };
  const url = `http://localhost:8000/api/shoppi/users/forgotPassword`;
  try {
    const res = await axios(url, config);
    console.log(res);
  } catch (err) {
    console.log(err.message);
  }
};

const resetPassword = async (token, password, confirmPassword) => {
  const config = {
    method: "post",
    data: { password, confirmPassword },
  };
  const url = `http://localhost:8000/api/shoppi/users/resetPassword/${token}`;
  try {
    const res = await axios(url, config);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export {
  getProducts,
  addNewProduct,
  editProduct,
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  getFeedbacksByProductId,
  addNewFeedback,
};
