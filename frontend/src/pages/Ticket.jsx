import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { getTicket, closeTicket } from "../features/tickets/ticketSlice.js"
import { getNotes, createNote, reset as notesReset } from "../features/notes/noteSlice.js"
import { BackButton } from "../components/BackButton.jsx"
import NoteItem from "../components/NoteItem.jsx"
import Spinner from "../components/Spinner.jsx"


// custom modals

// const customStyles = {
//     content: {
//         width: '600px',
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%,-50%)',
//         position: 'relative'
//     }
// }
const customStyles = {
    content: {
        width: '90%', // 90% of the parent container's width
        maxWidth: '600px', // Max width to limit the modal size
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        position: 'relative'
    }
};



Modal.setAppElement('#root');



function Ticket() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNodeText] = useState('');


    const { ticket, isLoading, isSuccess, isError, message } = useSelector(state => state.tickets);
    const { notes, isLoading: notesIsLoading } = useSelector(state => state.notes);

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ticketId } = params;

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
        // eslint-disable-next-line  
    }, [isError, message, ticketId])

    // create note submit
    const onNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(createNote({ noteText, ticketId }))
        closeModal();
    }


    //open /close modal 
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);




    if (isLoading || notesIsLoading) {
        return < Spinner />
    }

    if (isError) {
        return <h1>Something Went Wrong</h1>
    }

    // ticket close function
    const onTicketClosed = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url='/tickets' />
                <h2>
                    Ticket ID : {ticket._id}
                    <span className={`status status-${ticket.Status}`}>{ticket.Status}</span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-IN')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h3>Notes</h3>
            </header>

            {ticket.Status !== 'closed' && (
                <button className="btn" onClick={openModal}><FaPlus />Add Note</button>
            )}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}>X
                </button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea
                            name="noteText"
                            id="noteText"
                            className="form-control"
                            placeholder="Note text"
                            value={noteText}
                            onChange={(e) => { setNodeText(e.target.value) }}
                        ></textarea>
                        <div className="form-group">
                            <button className="btn" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </Modal>

            {notes.map((note) => (
                <NoteItem key={note.id} note={note} />
            ))}
            {
                ticket.Status !== 'closed'
                && <button className="btn btn-block btn-danger" onClick={onTicketClosed}>Close Ticket</button>
            }
            <div className="form-group">SupportDesk</div>
            <div className="form-group">--------------------</div>
        </div>

    )
}

export default Ticket
