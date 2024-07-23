const moongoose = require("mongoose");

exports.connectDB = async (conStr) => {
  try {
    const con = await moongoose.connect(conStr);
    if (con) {
      console.log("Connected to database");
    }
  } catch (err) {
    console.log(err.message);
  }
};
