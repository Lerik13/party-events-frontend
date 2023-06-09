import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout'
import styles from '@/styles/Form.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FaImage } from 'react-icons/fa';
import { formatDateForInput } from '@/utils/formatDate'
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';
import { parseCookies } from '@/helpers/index';
import { API_URL } from '@/config/index';

const EditEventPage = ({event, token}) => {
	const [values, setValues] = useState({
		name: event.name,
		performers: event.performers,
		venue: event.venue,
		address: event.address,
		date: formatDateForInput(event.date),
		time: event.time,
		description: event.description
	})
	const [imagePreview, setImagePreview] = useState(event.image ? event.image.formats.thumbnail.url : null)

	const [showModal, setShowModal] = useState(false)

	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()
		// Validation
		const hasEmptyFields = Object.values(values).some((element) => element === '')

		if (hasEmptyFields) {
			toast.error('Please fill in all fields')
		}

		const res = await fetch(`${API_URL}/events/${event.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(values)
		})

		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error('Unauthorized')
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

	const imageUploaded = async (e) => {
		const res = await fetch(`${API_URL}/events/${event.id}`)
		const data = await res.json()
		setImagePreview(data.image.formats.thumbnail.url)
		setShowModal(false)
	}

	return (
		<Layout>
			<Link href='/events'>Go Back</Link>
			<h1>Edit Event</h1>

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

				<input type="submit" value="Update Event" className='btn' />
			</form>

			<h2>Event Image</h2>
			{imagePreview ? (
				<Image src={imagePreview} height={100} width={170} alt={event.name} />
			) : (
				<div>
					<p>No image uploaded</p>
				</div>
			)}
			<div>
				<button className='btn-secondary' onClick={() => setShowModal(true)}>
					<FaImage /> Set Image
				</button>
			</div>

			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<ImageUpload eventId={event.id} imageUploaded={imageUploaded} token={token} />
			</Modal>
		</Layout>
	)
}

export default EditEventPage

export async function getServerSideProps({ params: {id}, req }) {
	const res = await fetch(`${API_URL}/events/${id}`)
	const event = await res.json()
	const {token} = parseCookies(req)
	//console.log(req.headers.cookie)
	
	return {
		props: {
			event,
			token
		}
	}
}