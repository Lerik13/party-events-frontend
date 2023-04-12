import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';
import { IEvent } from '@/types/event';

interface EventItemProps {
	event: IEvent;
}

const EventItem: React.FC<EventItemProps> = ({event}) => {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={event.image ? event.image.formats.thumbnail.url : '/images/event-default.png'}
					width={170}
					height={100}
					alt={event.name}
				/>
			</div>
			<div className={styles.info}>
				<span>
					{new Date(event.date).toLocaleDateString('en-US')} at {event.time}
				</span>
				<h3>{event.name}</h3>
			</div>
			<div className={styles.link}>
				<Link href={`/events/${event.slug}`} className='btn'>
					Details
				</Link>
			</div>
		</div>
	)
}

export default EventItem