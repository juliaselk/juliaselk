import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
	const [admin, setAdmin] = useState(false);
	useEffect(() => {
		setAdmin(!!localStorage.getItem('admin'));
	}, []);
	return <Component {...pageProps} admin={admin} />;
}
