import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '../styles/404.module.css';

const NotFoundPage = () => {
	return (
		<Layout title='Page bot found'>
			<div className={styles.error}>
				<h1>
					<FaExclamationTriangle /> 404
				</h1>
				<h4>Sorry, there is nothing here</h4>
				<Link href='/'>Go Back Home</Link>
			</div>
		</Layout>
	)
}

export default NotFoundPage