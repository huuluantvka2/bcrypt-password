const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Account = require('../modal/account');

/**POST '/login' : Đăng nhập */
router.post('/login', (req, res, next) => {
  Account.findOne({ username: { $eq: req.body.username } })
    .then((user) => {
      if (user) {
        // lấy mk từ db ra kiểm tra
        bcrypt
          .compare(req.body.password, user.password)
          .then(function (result) {
            if (result)
              res
                .status(200)
                .json({ userID: user['_id'], name: user.name, success: true });
            else res.status(400).send(`Sai mật khẩu, vui lòng kiểm tra lại!`);
          });
      } else {
        res.status(400).send(`Tài khoản không tồn tại!`);
      }
    })
    .catch((err) => console.log(err));
});

/**GET '/login' : Đăng nhập */
router.get('/login', (req, res, next) => {
  res.render('login');
});

/**GET '/register' : Đăng ký */
router.get('/register', (req, res, next) => {
  res.render('register');
});

/**POST '/register' : Đăng ký */
router.post('/register', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  Account.findOne({ username: { $eq: req.body.username } }) //kt trong db đã tồn tại user này chưa
    .then((result) => {
      if (result) {
        res.status(400).send(`Tài khoản ${result.username} đã tồn tại!`);
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          //mã hóa password
          console.log('Salt được tạo: ', salt);
          bcrypt.hash(req.body.password, salt, (error, hash) => {
            console.log('Hash: ', hash);
            if (err || error) res.status(404).json({ err: 'Lỗi mã hóa' });
            else {
              Account.create({ ...req.body, password: hash })
                .then((result) => {
                  res.status(200).json({ success: true });
                })
                .catch((err) => res.status(404).json({ success: false }));
            }
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

/**GET '/' : trang chủ */
router.get('/', (req, res, next) => {
  res.render('home');
});

module.exports = router;
