const express = require('express');
const db = require('./config/database');
const app = express();
const PORT = process.env.PORT || 4200;
const auth = require('./router/auth');
const exphbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');
/**Đọc dữ liệu kiểu post */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
/**Connect db */
db.connectDb();

app.use('/public', express.static(path.join(__dirname, 'public')));
/**set engine */
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
/** router đăng nhập đăng ký*/
app.use('/', auth);

app.listen(PORT, () => console.log('Server is listening on port ', PORT));
