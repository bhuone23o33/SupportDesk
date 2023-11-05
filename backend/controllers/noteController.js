const asyncHandler = require('express-async-handler');

const User = require('../models/userModel.js')
const Note = require('../models/noteModel.js')
const Ticket = require('../models/ticketModel.js')


// getting all tickets
// @desc   get notes for a ticket
// @route  GET /api/tickets/:ticketId/notes
// @access  private

const getNotes = asyncHandler(async (req, res) => {
    // get the user using id in jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authroized');
    }

    const notes = await Note.find({ ticket: req.params.ticketId });

    res.status(200).json(notes);
})
// getting all tickets
// @desc   create note for a ticket
// @route  POST /api/tickets/:ticketId/notes
// @access  private

const addNote = asyncHandler(async (req, res) => {
    // get the user using id in jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authroized');
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id,
    });

    res.status(200).json(note);
})



module.exports = {
    getNotes,
    addNote
}