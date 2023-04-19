import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Layout from '@/components/Layout'
import styles from '@/styles/Form.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { parseCookies } from '@/helpers/index';
import { API_URL } from '@/config/index';

const AddEventPage = ({token}) => {
	const [values, setValues] = useState({
		name: '',
		performers: '',
		venue: '',
		address: '',
		date: '',
		time: '',
		description: ''
	})

	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()
		// Validation
		const hasEmptyFields = Object.values(values).some((element) => element === '')

		if (hasEmptyFields) {
			toast.error('Please fill in all fields')
		}

		const res = await fetch(`${API_URL}/events`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(values)
		})

		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error('No token included')
				return
			}
			toast.error('Something went wrong')
		} else {
			const evt = await res.json()
			router.push(`/events/${evt.slug}`)
		}
	}

	const handleInputChange = (e) => {
		const {name, value} = e.target
		setValues({...values, [name]: value })
	}

	return (
		<Layout>
			<Link href='/events'>Go Back</Link>
			<h1>Add Event</h1>

			<ToastContainer />

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor="name">Event Name</label>
						<input type="text" id="" name="name" value={values.name} onChange={handleInputChange} />
					</div>
					<div>
						<label htmlFor="performers">Performers</label>
						<input type="text" id="performers" name="performers" value={values.performers} onChange={handleInputChange} />
					</div>
					<div>
						<label htmlFor="venue">Venue</label>
						<input type="text" id="venue" name="venue" value={values.venue} onChange={handleInputChange} />
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<input type="text" id="address" name="address" value={values.address} onChange={handleInputChange} />
					</div>
					<div>
						<label htmlFor="date">Date</label>
						<input type="date" id="date" name="date" value={values.date} onChange={handleInputChange} />
					</div>
					<div>
						<label htmlFor="time">Time</label>
						<input type="text" id="time" name="time" value={values.time} onChange={handleInputChange} />
					</div>
				</div>
				<div>
					<label htmlFor="description">description</label>
					<textarea id="description" name="description" value={values.description} onChange={handleInputChange}></textarea>
				</div>
				<input type="submit" value="Add Event" className='btn' />
			</form>
		</Layout>
	)
}

export default AddEventPage

export async function getServerSideProps({req}) {
	const {token} = parseCookies(req)

	return {
		props: {
			token
		}
	}
}