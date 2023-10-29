const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please add a product'],
        enum: ['iPhone', 'MacBookPro', 'MacAirBook', 'appleWatch']
    },
    discription: {
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