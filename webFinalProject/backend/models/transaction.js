const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, default: '' }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Transaction', TransactionSchema);