import React from 'react';
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from '@/components/EventItem';
import Link from 'next/link';
//import { IEvent } from '@/types/event';

/*interface EventsProps {
	tracks: IEvent[]
}*/

//const HomePage: React.FC<EventsProps> = ({events}) => {
const HomePage = ({events}) => {
	return (
		<Layout>
			<h1>Upcoming Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}

			{events.map(evt => (
				<EventItem key={evt.id} event={evt} />
			))}

			{events.length > 0 && (
				<Link href='/events' className='btn-secondary'>
					View All Events
				</Link>
			)}
		</Layout>
	)
}

export default HomePage;

//export async function getServerSideProps() {
export async function getStaticProps() {
	const res = await fetch(`${API_URL}/api/events`)
	const events = await res.json()

	return {
		props: {events: events.slice(0, 3)}, // top 3 events
		revalidate: 1,	// revalidate data every 1 sec, if data has changed => update data
	}
}