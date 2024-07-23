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
  const url = `http://localhost:8000/api/shoppi/products`;
  try {
    const res = await axios.post(url, {
      name,
      price,
      cat,
      image,
    });
    console.log(res);
  } catch (err) {
    console.log(err.message);
  }
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

console.log(getProducts());

export { getProducts, addNewProduct, editProduct };
