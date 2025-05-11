const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    }
}, { timestamps: true });

// Ensure a user can't add the same book twice
cartSchema.index({ userId: 1, bookId: 1 }, { unique: true });

module.exports = mongoose.model('Cart', cartSchema);
