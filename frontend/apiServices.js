const getProducts = async () => {
  const url = `http://localhost:8000/api/shoppi/products`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
const addNewProduct = async (name, price, cat, image) => {
  const config = {
    data: { name, price, cat, image },
    withCredentials: true,
    method: "post",
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

console.log(getProducts());

export { getProducts, addNewProduct, editProduct, login };
