const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String, // String is shorthand for {type: String}
    email: String,
    password: String,
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Référence au modèle Product pour stocker les produits dans la liste
      },
    ],
  });

  const User = mongoose.model('User', userSchema)

  module.exports = User;