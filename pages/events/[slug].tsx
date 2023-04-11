import React from 'react'
import Layout from '@/components/Layout'
import { API_URL } from '@/config'

const EventPage = ({event}) => {
	return (
		<Layout>
			<h1>{event.name}</h1>
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