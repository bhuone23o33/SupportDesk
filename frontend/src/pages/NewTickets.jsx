import { useState } from "react"
import { useSelector } from "react-redux"

function NewTickets() {
    const { user } = useSelector(state => state.auth);
    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('iPhone');
    const [description, setDescription] = useState(' ');

    // onsubmit the form

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <section className="heading">
                <h1>Create new Ticket</h1>
                <p>Please fill out form below</p>
            </section>


            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input type="text" className="form-control"
                        value={name}
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input type="text" className="form-control"
                        value={email}
                        disabled
                    />
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name="product"
                            id="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        >
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="Macbook Air">Macbook Air</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <textarea
                            name="description"
                            id="description"
                            className="form-control"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <div className="btn btn-block">
                            Submit
                        </div>
                    </div>
                    <div className="form-group">SupportDesk</div>
                    <div className="form-group">--------------------</div>
                </form>
            </section>
        </>
    )
}

export default NewTickets
