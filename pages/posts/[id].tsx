import { useRouter } from 'next/router';
import tiles from '../../data/tiles';
import Image from '../../components/image/image';
import { deleteDoc, doc, getDoc, getFirestore, query, setDoc, where } from 'firebase/firestore';
import styles from '../../styles/Post.module.scss';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD5ajHK3D9fcixwQCOVoIbdcaTb9urLFlE',
	authDomain: 'eric-selk.firebaseapp.com',
	projectId: 'eric-selk',
	storageBucket: 'eric-selk.appspot.com',
	messagingSenderId: '717819120561',
	appId: '1:717819120561:web:84fe34b101b359efec8b90',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

import { collection, addDoc, getDocs } from 'firebase/firestore';
import Post from '../../types/Post';
import { useState, useEffect, useRef } from 'react';

const Post = ({ admin }: { admin: boolean }) => {
	const router = useRouter();
	const documentId = useRef('');
	const { id } = router.query as { id: string };

	const [post, setPost] = useState<Post>();
	const [toast, setToast] = useState('');
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		const loadPost = async () => {
			const querySnapshot = await getDocs(
				query(collection(db, 'julia', 'data', 'posts'), where('link', '==', id))
			);
			const postDocument = querySnapshot.docs[0];
			documentId.current = postDocument.id;
			setPost(postDocument.data() as Post);
		};
		if (!id) {
			return;
		}
		loadPost();
	}, [id]);

	useEffect(() => {
		if (showToast) {
			setTimeout(() => {
				setShowToast(false);
			}, 5000);
		}
	}, [showToast]);

	if (!post) {
		return null;
	}

	const { headline, image, paragraphs, details } = post;

	const save = () => {
		const savePost = async () => {
			await setDoc(doc(db, 'julia', 'data', 'posts', documentId.current), post);
			setToast('post saved!');
			setShowToast(true);
		};
		savePost();
	};

	const doDelete = () => {
		const deletePost = async () => {
			await deleteDoc(doc(db, 'julia', 'data', 'posts', documentId.current));
			router.push('/');
		};
		deletePost();
	};

	return (
		<div className={styles.container}>
			<Image alt={headline} src={image} width={753} height={1209} />
			<h1>{headline}</h1>
			<h2>{details}</h2>
			{paragraphs.map((paragraph, index) => (
				<p key={index}>{paragraph}</p>
			))}
			{admin && (
				<>
					<input
						onChange={(event) => setPost({ ...post, headline: event.target.value })}
						type="text"
						value={headline}
					/>
					<input
						onChange={(event) => setPost({ ...post, image: event.target.value })}
						type="text"
						value={image}
					/>
					<input
						onChange={(event) => setPost({ ...post, details: event.target.value })}
						type="text"
						value={details}
					/>
					<textarea
						value={paragraphs.join('\n\n')}
						onChange={(event) =>
							setPost({
								...post,
								paragraphs: event.target.value.split('\n\n'),
							})
						}
					/>
					<button onClick={save}>Save</button>
					<button onClick={doDelete}>Delete</button>
				</>
			)}
			<div
				onClick={() => setShowToast(false)}
				className={styles.toast + (showToast ? ' ' + styles.toastShow : '')}
			>
				{toast}
			</div>
		</div>
	);
};

export default Post;
