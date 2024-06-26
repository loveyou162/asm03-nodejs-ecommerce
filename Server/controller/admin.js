const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const room = require("../models/room");
const fileHelper = require("../util/file");
//hàm xóa "http://localhost:5000/"
const filePath = (path) => {
  return path.replace("http://localhost:5000/", "");
};
exports.getProductsAdmin = async (req, res, next) => {
  Product.find()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      next(err);
    });
};
exports.postSearchProduct = (req, res, next) => {
  const query = req.body.query;
  const regexQuery = new RegExp(query, "i");
  Product.find({ name: regexQuery })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.getDashboard = async (req, res, next) => {
  try {
    //lấy tổng số user
    const quantityUser = await User.find();
    //lấy trung bình thu nhập
    const arrPrice = await Order.find().distinct("user.totalPrice");
    //tính tổng giá tiền các order
    const averagePrice = arrPrice.reduce((a, b) => a + b, 0);
    const order = await Order.find();
    const allData = {
      quantityUser: quantityUser.length,
      averagePrice: Math.floor(averagePrice),
      quantityOrder: order.length,
      listOrder: order,
    };
    res.json(allData);
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
exports.postNewProduct = (req, res, next) => {
  const { name, price, category, count, shortDesc, longDesc } = req.body;
  const images = req.files;
  //tạo mới một product
  const product = new Product({
    name: name,
    price: price,
    category: category,
    count: count,
    img1: `http://localhost:5000/${images[0].path}`,
    img2: `http://localhost:5000/${images[1].path}`,
    img3: `http://localhost:5000/${images[2].path}`,
    img4: `http://localhost:5000/${images[3].path}`,
    short_desc: shortDesc,
    long_desc: longDesc,
    userId: req.user,
  });
  product.save().then((result) => {
    res.json({ message: "Đã thêm sản phẩm thành công" });
    console.log("Created Product!");
  });
};

//lấy dữ liệu mặc định cho form
exports.getUpdateProduct = (req, res, next) => {
  const prodId = req.query.prodId;
  Product.findById(prodId)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(err);
    });
};
//thực hiện update product
exports.postUpdateProduct = (req, res, next) => {
  const { productId, name, price, count, category, shortDesc, longDesc } =
    req.body;
  const images = req.files;
  console.log(images);

  Product.findOne({ _id: productId })
    .then((product) => {
      console.log(product);
      //nếu các trường không được điền đủ thì sẽ thay thế bằng trường hiện tại để tránh lỗi
      product.name = name ? name : product.name;
      product.price = price ? price : product.price;
      product.category = category ? category : product.category;
      product.count = count ? count : product.count;
      //nếu có image[0] thì xóa ảnh cũ và thêm ảnh mới
      if (images[0]) {
        fileHelper.deleteFile(filePath(product.img1));
        product.img1 = images[0]
          ? `http://localhost:5000/${images[0].path}`
          : product.img1;
      }
      if (images[1]) {
        fileHelper.deleteFile(filePath(product.img2));
        product.img2 = images[1]
          ? `http://localhost:5000/${images[1].path}`
          : product.img2;
      }
      if (images[2]) {
        fileHelper.deleteFile(filePath(product.img3));
        product.img3 = images[2]
          ? `http://localhost:5000/${images[2].path}`
          : product.img3;
      }
      if (images[3]) {
        fileHelper.deleteFile(filePath(product.img4));
        product.img4 = images[3]
          ? `http://localhost:5000/${images[3].path}`
          : product.img4;
      }
      product.short_desc = shortDesc ? shortDesc : product.short_desc;
      product.long_desc = longDesc ? longDesc : product.long_desc;
      product.userId = req.user;
      return product.save().then(() => {
        console.log("Updated Product");
        res.json({ message: "Updated successfully!" });
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.deleteProduct = (req, res, next) => {
  const prodId = req.query.prodId;
  console.log("delete:", prodId);
  Product.findById(prodId)
    .then((product) => {
      //xóa hết ảnh cũ trong /images khi xóa sản phẩm
      fileHelper.deleteFile(filePath(product.img1));
      fileHelper.deleteFile(filePath(product.img2));
      fileHelper.deleteFile(filePath(product.img3));
      fileHelper.deleteFile(filePath(product.img4));
      console.log("Đã xóa thành công!");
      return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(() => {
      res.json({ message: "Đã xóa thành công 1 sản phẩm!" });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

//hàm lấy all Room
exports.getMessage = (req, res, next) => {
  room
    .find()
    .then((room) => {
      res.json(room);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.getDetailMessage = (req, res, next) => {
  const roomId = req.query.roomId;
  room
    .findOne({ roomId: roomId })
    .populate("messages.messageId")
    .then((room) => {
      room.populate("userId").then((room) => {
        res.json(room);
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
