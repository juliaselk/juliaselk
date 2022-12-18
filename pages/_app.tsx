import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Header from '../components/header/header';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	const [admin, setAdmin] = useState(false);
	useEffect(() => {
		setAdmin(!!localStorage.getItem('admin'));
	}, []);
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Header />
			<Component {...pageProps} admin={admin} />
		</>
	);
}
