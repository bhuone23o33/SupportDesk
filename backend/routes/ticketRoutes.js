const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const { getTickets, getTicket, createTickets, deleteTicket, updateTicket } = require('../controllers/ticketController.js')
// router.get('/', protect, getTickets);
// router.post('/', protect, createTicket);
// same as
router.route('/').get(protect, getTickets).post(protect, createTickets);
router.route('/:id')
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket)

module.exports = router