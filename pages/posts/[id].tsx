import { useRouter } from 'next/router';
import Image from '../../components/image/image';
import styles from '../../styles/Post.module.scss';

import Post from '../../types/Post';
import { useState, useEffect, useRef } from 'react';
import { deletePost, loadPost, savePost } from '../../firebase';

const Post = ({ admin }: { admin: boolean }) => {
	const router = useRouter();
	const documentId = useRef('');
	const { id } = router.query as { id: string };

	const [post, setPost] = useState<Post>();
	const [toast, setToast] = useState('');
	const [showToast, setShowToast] = useState(false);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		if (!id) {
			return;
		}
		loadPost(id).then((data) => {
			if (!data) {
				setNotFound(true);
				return;
			}
			const { post, id } = data;
			setPost(post);
			documentId.current = id;
		});
	}, [id]);

	useEffect(() => {
		if (showToast) {
			setTimeout(() => {
				setShowToast(false);
			}, 5000);
		}
	}, [showToast]);

	if (notFound) {
		return <h1>this page is no longer here</h1>;
	}
	if (!post) {
		return null;
	}

	const { link, headline, image, paragraphs, details } = post;

	const save = () => {
		savePost(documentId.current, post).then(() => {
			setToast('post saved!');
			setShowToast(true);
			router.replace(`/posts/${link}`);
		});
	};

	const doDelete = () => {
		deletePost(documentId.current).then(() => {
			router.push('/');
		});
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
						onChange={(event) => setPost({ ...post, link: event.target.value })}
						type="text"
						value={link}
					/>
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
