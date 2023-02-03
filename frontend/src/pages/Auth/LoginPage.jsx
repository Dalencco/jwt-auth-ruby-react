import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [form, setForm] = useState({
        email: null,
        password: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) return setErrors('Faltan campos por completar');

        setLoading(true)
        try {
            const res = await axios.post('http://localhost:3001/auth/login', {
                email: form.email,
                password: form.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setLoading(false)
            localStorage.setItem('token', res.data.token)
            return navigate('/profile')
        } catch (err) {
            setLoading(false)
            setErrors(err.response.data.error)
        }
    }

    if (errors) setTimeout(() => { setErrors(null) }, 5000)

  return (
    <div>

        {loading ? 'Cargando...' : ''}
        {errors}

        <form onSubmit={handleSubmit}>

            <input type="email" name="email" onChange={e => setForm({...form, email: e.target.value})} autoComplete='off' />
            <input type="password" name="password" onChange={e => setForm({...form, password: e.target.value})} autoComplete='off' />

            <button type="submit"> Login </button>

        </form>

    </div>
  )
}

export default LoginPage