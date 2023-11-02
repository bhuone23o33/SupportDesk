const asyncHandler = require('express-async-handler');

const User = require('../models/userModel.js')
const Ticket = require('../models/ticketModel.js')


// getting all tickets
// @desc   get user single ticket
// @route  GET /api/tickets 
// @access  private

const getTickets = asyncHandler(async (req, res) => {
    // get the user using id in jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    const tickets = await Ticket.find({ user: req.user.id });

    res.status(200).json(tickets);
})

// getting single ticket
// @desc   get user single ticket
// @route  GET /api/tickets/:id
// @access  private

const getTicket = asyncHandler(async (req, res) => {
    // get the user using id in jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error("ticket not found");
    }

    // not acess anybody just that user
    if (ticket.user.toString() !== req.user.id) {
        res.status(404);
        throw new Error("Not Authroized");
    }

    res.status(200).json(ticket);
})

// removing tickets
// getting single ticket
// @desc   get user single ticket
// @route  DELETE /api/tickets/:id
// @access  private

const deleteTicket = asyncHandler(async (req, res) => {
    // get the user using id in jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error("ticket not found");
    }

    // not acess anybody just that user
    if (ticket.user.toString() !== req.user.id) {
        res.status(404);
        throw new Error("Not Authroized");
    }

    // await ticket.remove();
    await Ticket.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true });
})


// update ticket
// removing tickets
// getting single ticket
// @desc   get user single ticket
// @route  PUT /api/tickets/:id
// @access  private

const updateTicket = asyncHandler(async (req, res) => {
    // get the user using id in jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error("ticket not found");
    }

    // not acess anybody just that user
    if (ticket.user.toString() !== req.user.id) {
        res.status(404);
        throw new Error("Not Authroized");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedTicket);
})





// creating tickets
// @desc   create user tickets
// @route  POST /api/tickets 
// @access  private

const createTickets = asyncHandler(async (req, res) => {
    const { product, description } = req.body;

    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a product and description')
    }

    // get the user using id in jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // creating tickets

    const tickets = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })


    res.status(201).json(tickets);
})


module.exports = {
    getTickets,
    deleteTicket,
    updateTicket,
    getTicket,
    createTickets
};