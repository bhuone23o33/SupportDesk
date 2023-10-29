import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice.js'
function Login() {
    // to store data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // destructing the formData for easy acces
    const { email, password } = formData;

    // use dispatch
    const dispatch = useDispatch();

    // use Selector
    const { user, isLoading, isSuccess, message } = useSelector(state => state.auth);

    // onChange function in inputs
    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    // onSubmit the form
    const onSubmit = (e) => {
        e.preventDefault();
        const UserData = {
            email,
            password
        }
        dispatch(register(UserData));
    }
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt />Login
                </h1>
                <p>Please enter your credential</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type='email' className='form-control' id='email' name='email' value={email} onChange={onChange} placeholder='Enter your email' required />
                    </div>
                    <div className="form-group">
                        <input type='password' className='form-control' id='password' name='password' value={password} onChange={onChange} placeholder='Enter password' required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
