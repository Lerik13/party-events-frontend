import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Layout from '@/components/Layout'
import { API_URL } from '@/config'
import { IEvent } from '@/types/event';
import styles from '@/styles/Event.module.css';

interface EventProps {
	tracks: IEvent;
}

const EventPage: React.FC<EventProps> = ({event}) => {
	const deleteEvent = (e) => {
		console.log('delete')
	}

	return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${event.id}`}>
						<FaPencilAlt /> Edit Event
					</Link>
					<a href="#" className={styles.delete} onClick={deleteEvent}>
						<FaTimes /> Delete Event
					</a>
				</div>

				<span>
					{event.date} at {event.time}
				</span>
				<h1>{event.name}</h1>
				{event.image && (
					<div className={styles.image}>
						<Image src={event.image} width={960} height={600} alt={event.name} />
					</div>
				)}

				<h3>Performers:</h3>
				<p>{event.performers}</p>
				<h3>Description:</h3>
				<p>{event.description}</p>
				<h3>Venue: {event.venue}</h3>
				<p>{event.address}</p>

				<Link href='/events' className={styles.back}>
					{'<'} Go Back
				</Link>
			</div>
		</Layout>
	)
}

export default EventPage


export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/api/events`)
	const events = await res.json()
	
	const paths = events.map(evt => ({
		params: {slug: evt.slug}
	}))

	return {
		paths,
		fallback: true // false: if resource does not found => show 404 ; true: => make a new request
	}
}

export async function getStaticProps({ params: {slug} }) {
	const res = await fetch(`${API_URL}/api/events/${slug}`)
	const events = await res.json()

	return {
		props: {
			event: events[0]
		},
		revalidate: 1
	}
}
/*
export async function getServerSideProps({ query: {slug} }) {
	const res = await fetch(`${API_URL}/api/events/${slug}`)
	const events = await res.json()

	return {
		props: {
			event: events[0]
		}
	}
}
*/