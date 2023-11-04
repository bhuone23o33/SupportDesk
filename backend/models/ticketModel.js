const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please add a product'],
        enum: ['iPhone', 'Macbook Pro', 'iPad', 'Macbook Air']
    },
    description: {
        type: String,
        required: [true, 'Please add a discription']
    },
    Status: {
        type: String,
        require: true,
        enum: [
            'new', 'open', 'closed'
        ],
        default: 'new'
    }

},
    {
        timestamps: true
    });

module.exports = mongoose.model('Ticket', ticketSchema);