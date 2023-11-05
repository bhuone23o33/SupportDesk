import { useEffect } from "react"
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice.js"
import { BackButton } from "../components/BackButton.jsx"
import Spinner from "../components/Spinner.jsx"

function Ticket() {

    const { ticket, isLoading, isSuccess, isError, message } = useSelector(state => state.tickets);

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ticketId } = params;

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getTicket(ticketId))
        // eslint-disable-next-line  
    }, [isError, message, ticketId])

    if (isLoading) {
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
            </header>
            {
                ticket.Status !== 'closed'
                && <button className="btn btn-block btn-danger" onClick={onTicketClosed}>Close Ticket</button>
            }
        </div>
    )
}

export default Ticket
