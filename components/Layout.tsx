import React from 'react'
import Head from 'next/head';
import styles from '../styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import { useRouter } from 'next/router';

interface LayoutProps {
	title: string;
	keywords: string;
	description: string;
}

const Layout: React.FC<LayoutProps> = ({
		title = 'DJ Events | Find the hottest parties',
		keywords = 'music, dj, event, party',
		description = 'Find the latest DJ and other musical events',
		children }) => {

	const router = useRouter()

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
			</Head>

			<Header />

			{router.pathname === '/' && <Showcase />}

			<div className={styles.container}>
				{children}
			</div>
			<Footer />
		</div>
	)
}

export default Layout;
