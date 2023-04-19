import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css';
import EventMap from '@/components/EventMap';

const EventPage = ({event}) => {
	return (
		<Layout>
			<div className={styles.event}>
				<span>
					{new Date(event.date).toLocaleDateString('en-US')} at {event.time}
				</span>
				<h1>{event.name}</h1>

				{event.image && (
					<div className={styles.image}>
						<Image src={event.image.formats.medium.url} width={960} height={600} alt={event.name} />
					</div>
				)}

				<h3>Performers:</h3>
				<p>{event.performers}</p>
				<h3>Description:</h3>
				<p>{event.description}</p>
				<h3>Venue: {event.venue}</h3>
				<p>{event.address}</p>
				
				<EventMap evt={event} />

				<Link href='/events'>
					<a className={styles.back}>
						{'<'} Go Back
					</a>
				</Link>
			</div>
		</Layout>
	)
}

export default EventPage


export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/events`)
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
	const res = await fetch(`${API_URL}/events?slug=${slug}`)
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