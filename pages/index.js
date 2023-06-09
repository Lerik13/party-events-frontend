import React from 'react';
import Link from 'next/link';
import Layout from "@/components/Layout";
import EventItem from '@/components/EventItem';
import { API_URL } from "@/config/index";

const HomePage = ({events}) => {
	//console.log(events)
	//return (<Layout> Home </Layout>)
	return (
		<Layout>
			<h1>Upcoming Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}

			{events.map(evt => (
				<EventItem key={evt.id} event={evt} />
			))}

			{events.length > 0 && (
				<Link href='/events'>
					<a className='btn-secondary'>
						View All Events
					</a>
				</Link>
			)}
		</Layout>
	)
}

export default HomePage;

//export async function getServerSideProps() {
export async function getStaticProps() {
	const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
	const events = await res.json()
	
	return {
		//props: {events: events.slice(0, 3)}, // top 3 events
		props: {events},
		revalidate: 1,	// revalidate data every 1 sec, if data has changed => update data
	}
}