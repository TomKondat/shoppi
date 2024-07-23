let users = [
  {
    id: 1,
    name: "tom",
    email: "tom@gmail.com",
    password: "123",
  },
  {
    id: 2,
    name: "david",
    email: "david@gmail.com",
    password: "456",
  },
];

exports.addNewUser = (req, res) => {
  const { name, email, password } = req.body;
  const id = users.length + 1;
  const newUser = { name, email, password, id };
  const user = users.find((user) => user.email == email);
  if (!user) {
    users.push(newUser);
    res.status(201).json({
      status: "success",
      user: newUser,
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "User already exists please login",
    });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const existUser = users.find((user) => user.email == email);

  if (existUser && existUser.password == password) {
    res.status(201).json({
      status: "success",
      token: 1234,
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Password incorrect/email incorrect",
    });
  }
};
