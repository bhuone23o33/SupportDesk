import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
function Register() {
    // to store data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    // destructing the formData for easy acces
    const { name, email, password, password2 } = formData;

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
        console.log(password[0], password2[0]);
        // if pass don't match
        if (password !== password2) {
            toast.error("Password do not match");
        }
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
