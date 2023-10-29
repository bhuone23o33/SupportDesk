import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice.js'
import Spinner from '../components/Spinner.jsx'


function Register() {
    // to store data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const navigate = useNavigate();


    // destructing the formData for easy acces
    const { name, email, password, password2 } = formData;

    // use dispatch
    const dispatch = useDispatch();

    // use Selector
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        // redirect to logged in
        if (isSuccess && user) {
            navigate('/');
        }

        dispatch(reset());

    }, [isError, isSuccess, navigate, user, message, dispatch]);


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
        // if pass don't match
        if (password !== password2) {
            toast.error("Password do not match");
        } else {
            const UserData = {
                name,
                email,
                password
            }
            dispatch(register(UserData));
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser />Register
                </h1>
                <p>Please create your account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type='text' className='form-control' id='name' name='name' value={name} onChange={onChange} placeholder='Enter your name' required />
                    </div>
                    <div className="form-group">
                        <input type='email' className='form-control' id='email' name='email' value={email} onChange={onChange} placeholder='Enter your email' required />
                    </div>
                    <div className="form-group">
                        <input type='password' className='form-control' id='password' name='password' value={password} onChange={onChange} placeholder='Enter password' required />
                    </div>
                    <div className="form-group">
                        <input type='password' className='form-control' id='password2' name='password2' value={password2} onChange={onChange} placeholder='Enter confirm password' required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register
