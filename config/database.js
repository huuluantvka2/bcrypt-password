const mongoose = require('mongoose');

module.exports = {
  connectDb: () => {
    mongoose
      .connect(
        'mongodb+srv://dev-courses-f8:Longthoi123@cluster0.gvn98.mongodb.net/EXPRESSDATABASE?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log('Connect database successfully'))
      .catch(() => console.log('Error'));
  },
};
