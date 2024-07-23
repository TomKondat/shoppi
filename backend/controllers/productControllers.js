const Product = require("./../models/productModel");

// const products = [
//   {
//     id: "1",
//     cat: "food",
//     name: "Milk",
//     price: "6",
//     image:
//       "https://cdn.pixabay.com/photo/2017/07/05/15/41/milk-2474993_150.jpg",
//   },
//   {
//     id: "2",
//     cat: "food",
//     name: "Bread",
//     price: "8",
//     image:
//       "https://cdn.pixabay.com/photo/2014/07/22/09/59/bread-399286_150.jpg",
//   },
//   {
//     id: "4",
//     cat: "food",
//     name: "Eggs",
//     price: "12",
//     image: "https://cdn.pixabay.com/photo/2015/09/17/17/19/egg-944495_150.jpg",
//   },
//   {
//     id: "3",
//     cat: "clothing",
//     name: "Coat",
//     price: "120",
//     image:
//       "https://cdn.pixabay.com/photo/2015/05/29/19/19/person-789663_150.jpg",
//   },
//   {
//     id: "5",
//     cat: "clothing",
//     name: "Dress",
//     price: "4000",
//     image:
//       "https://cdn.pixabay.com/photo/2016/06/29/04/17/wedding-dresses-1485984_150.jpg",
//   },
//   {
//     id: "6",
//     cat: "clothing",
//     name: "Shirt",
//     price: "70",
//     image:
//       "https://cdn.pixabay.com/photo/2014/08/05/10/31/waiting-410328_150.jpg",
//   },
//   {
//     id: "7",
//     cat: "animals",
//     name: "Dog food",
//     price: "70",
//     image: "https://cdn.pixabay.com/photo/2017/04/07/10/53/dog-2210717_150.jpg",
//   },
//   {
//     id: "8",
//     cat: "animals",
//     name: "Cat toy",
//     price: "50",
//     image: "https://cdn.pixabay.com/photo/2018/07/21/09/17/cat-3552143_150.jpg",
//   },
// ];

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findById(id);
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  console.log(req.body);
  const { name, price, image, cat, quantity } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      price,
      cat,
      image,
      quantity,
    });

    res.status(201).json({
      status: "success",
      product: newProduct,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.editProductById = (req, res) => {
  console.log(`req: ${req.body.id}`);
  const { id } = req.params;
  const { name, price } = req.body;
  const product = products.find((product) => product.id == id);
  if (product) {
    product.name = name;
    product.price = price;
    res.status(200).json({
      status: "success",
      product,
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Not found",
    });
  }
};

exports.deleteProductById = (req, res) => {
  const { id } = req.params;
  if (id) {
    products = products.filter((product) => product.id != id);
    res.status(202).json({
      status: "success",
      product: null,
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "fail delete product",
    });
  }
};
