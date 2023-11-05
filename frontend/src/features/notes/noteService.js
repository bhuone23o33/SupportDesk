import axios from "axios";

const API_URL = 'api/tickets/'



// getting ticket notes
const getnotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + ticketId + '/notes', config);

    return response.data;

}

const noteService = {
    getnotes
}

export default noteService