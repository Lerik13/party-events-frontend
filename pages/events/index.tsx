import React from 'react'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config';

const EventsPage = ({events}) => {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}

			{events.map(evt => (
				<EventItem key={evt.id} event={evt} />
			))}
		</Layout>
	)
}

export default EventsPage;

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/events?_sort=date:ASC`)
	const events = await res.json()

	return {
		props: {events},
		revalidate: 1,	// revalidate data every 1 sec, if data has changed => update data
	}
}