const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const sendEmailService = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "caoboi520@gmail.com",
      pass: "dcnzdobumhlxmjrf",
    },
  });
  const info = await transporter.sendMail({
    from: '"Thắng Phạm 👻" <caoboi520@gmail.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });
  return info;
};
const formatPrice = (price) => {
  // Chuyển đổi số thành chuỗi
  let priceString = price.toString();
  // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
  priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return priceString;
};
exports.getAllProducts = async (req, res, next) => {
  Product.find()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getDetailProduct = (req, res, next) => {
  const prodId = req.query.prodId;
  console.log(prodId);
  Product.findById(prodId)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCart = (req, res, next) => {
  console.log("getCart: ", req.user);
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      res.json(user.cart.items);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      if (product.count > 0) {
        return req.user.addToCart(product);
      } else {
        return res.json({ message: "Số lượng sản phẩm đang tạm hết!" });
      }
    })
    .then((user) => {
      const productId = user.cart.items.find((product) => {
        return product.productId.toString() === prodId.toString();
      });

      res.json({ quantity: productId });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.postDecrementCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      console.log(product);
      // dùng phương thức decrement của usẻ để giảm số lượng 1 sản phẩm trong giỏ hàng
      return req.user.decrementToCart(product);
    })
    .then((user) => {
      //tìm kiếm sản phẩm trong giỏ hàng của người dùng đó
      const productId = user.cart.items.find((product) => {
        return product.productId.toString() === prodId.toString();
      });
      res.json({ quantity: productId });
    })
    .catch((err) => {
      console.log(83, err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteCartProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((user) => {
      //tìm kiếm sản phẩm trong giỏ hàng của người dùng đó
      const productId = user.cart.items.find((product) => {
        return product.productId.toString() === prodId.toString();
      });
      res.json({ quantity: productId });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.postOrder = async (req, res, next) => {
  const { totalPrice, fullname, email, phone, address } = req.body;
  const errors = validationResult(req);

  // Kiểm tra nếu có lỗi từ validationResult
  if (!errors.isEmpty()) {
    // Nếu có lỗi, trả về một đối tượng JSON chứa thông tin lỗi
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log({ totalPrice, fullname, email, phone, address });

    // Tìm nạp người dùng và điền chi tiết sản phẩm vào các mục trong giỏ hàng
    const user = await req.user.populate("cart.items.productId");

    // Trích xuất sản phẩm và số lượng từ giỏ hàng
    const products = user.cart.items.map((item) => ({
      quantity: item.quantity,
      product: { ...item.productId._doc },
    }));

    // Kiểm tra tình trạng còn hàng của sản phẩm trước khi tạo đơn hàng
    const insufficientStock = products.some(
      (item) => item.quantity > item.product.count
    );
    if (insufficientStock) {
      return res.json({
        message:
          "số lượng bạn chọn đã vượt quá số lượng sản phẩm còn lại trong kho!",
        isOrder: false,
      });
    }

    // Cập nhật số lượng sản phẩm (giả sử bạn có hàm updateProduct riêng)
    await Promise.all(
      products.map((item) => updateProduct(item.product._id, item.quantity))
    );

    // Tạo đối tượng đặt hàng với các sản phẩm đã cập nhật
    const order = new Order({
      date: new Date(),
      user: {
        totalPrice: totalPrice,
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        userId: req.user,
      },
      products: products,
    });

    // Tạo danh sách sản phẩm cho email (nếu cần)
    const productList = user.cart.items
      .map(
        (item) => `
        <tr>
          <td>${item.productId.name}</td>
          <td><img src="${item.productId.img1}" alt="${
          item.productId.name
        }" style="width: 100px;"></td>
          <td>${formatPrice(item.productId.price)} VNĐ</td>
          <td>${item.quantity}</td>
          <td>${formatPrice(item.quantity * item.productId.price)} VNĐ</td>
        </tr>
      `
      )
      .join("");

    // Đặt hàng, gửi email thông báo (nếu được triển khai) và xóa giỏ hàng
    const savedOrder = await order.save();
    const subject = "Order Succeeded!";
    const html = `
      <html>
        <body>
          <h2>Xin Chào ${fullname}</h2>
          <p>Phone: ${phone}</p>
          <table>
            <tr>
              <th>Tên Sản Phẩm</th>
              <th>Hình Ảnh</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Thành tiền</th>
            </tr>
            ${productList}
          </table>
          <h1>Tổng Thanh Toán</h1>
          <h1>${formatPrice(totalPrice)} VNĐ</h1>
          <br />
          <h1>Cảm ơn bạn!</h1>
        </body>
      </html>`;
    await sendEmailService(email, subject, html);
    await req.user.clearCart();

    res.json({ message: "Order placed successfully!", order: savedOrder });
  } catch (err) {
    console.error(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};

// Giả sử bạn có một hàm updateProduct riêng để sửa đổi số lượng sản phẩm
async function updateProduct(productId, quantity) {
  const product = await Product.findByIdAndUpdate(productId, {
    $inc: { count: -quantity },
  });
  /// Xử lý các lỗi tiềm ẩn trong quá trình cập nhật sản phẩm
  if (!product) {
    throw new Error("Product not found!");
  }
  return product;
}

exports.getOrder = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((order) => {
      res.json(order);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrderDetail = (req, res, next) => {
  const OrderId = req.body.OrderId;
  Order.findById(OrderId)
    .then((order) => {
      console.log(order);
      res.json(order);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
