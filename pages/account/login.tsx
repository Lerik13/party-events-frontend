import React, {useState, useEffect, useContext} from 'react'
import { FaUser } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import styles from '@/styles/AuthForm.module.css';
import Layout from '@/components/Layout';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const {login, error} = useContext(AuthContext)

	//useEffect(() => error && toast.error(error))
	
	useEffect(() => {
		if (error) {
			toast.error(error)
		}
	}, [login, error])

	const handleSubmit = (e) => {
		e.preventDefault()
		login({ email, password })
		
	}

	return (
		<Layout title='User Login'>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Log In
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email Address</label>
					<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<label htmlFor="password">Password</label>
					<input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

					<input type="submit" value="Login" className='btn' />
				</form>

				<p>Don't have an account? <Link href='/account/register'>Register</Link></p>
			</div>
		</Layout>
	)
}

export default LoginPage