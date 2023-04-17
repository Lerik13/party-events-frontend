import React, {useState, useContext, useEffect} from 'react'
import { FaUser } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import styles from '@/styles/AuthForm.module.css';
import Layout from '@/components/Layout';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';

const RegisterPage = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')

	const {register, error} = useContext(AuthContext)

	useEffect(() => {
		if (error) {
			toast.error(error)
		}
	}, [error])

	const handleSubmit = (e) => {
		e.preventDefault()

		if (password !== passwordConfirm) {
			toast.error('Password do not match')
			return
		}
		register({ username, email, password })
	}

	return (
		<Layout title='User Login'>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Register
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					<label htmlFor="username">Username</label>
					<input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
					<label htmlFor="email">Email Address</label>
					<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<label htmlFor="password">Password</label>
					<input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<label htmlFor="passwordConfirm">Confirm Password</label>
					<input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />

					<input type="submit" value="Submit" className='btn' />
				</form>

				<p>Already have an account? <Link href='/account/login'>Login</Link></p>
			</div>
		</Layout>
	)
}

export default RegisterPage