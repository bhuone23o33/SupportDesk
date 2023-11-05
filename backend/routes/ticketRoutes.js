const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const { getTickets, getTicket, createTickets, deleteTicket, updateTicket } = require('../controllers/ticketController.js')

// Re-route into notRouter
// noteRouter
const noteRouter = require('./noteRoutes.js')
// pretend to be noteRouter 
router.use('/:ticketId/notes', noteRouter);


// same as
router.route('/').get(protect, getTickets).post(protect, createTickets);
router.route('/:id')
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket)

module.exports = router