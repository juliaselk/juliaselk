import { deleteDoc, doc, documentId, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import Post from './types/Post';
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

export const loadPosts = async () => {
	const querySnapshot = await getDocs(collection(db, 'julia', 'data', 'posts'));
	return querySnapshot.docs.map((doc) => doc.data() as Post);
};

export const loadPost = async (id: string) => {
	const querySnapshot = await getDocs(query(collection(db, 'julia', 'data', 'posts'), where('link', '==', id)));
	const postDocument = querySnapshot.docs[0];
	return postDocument ? { post: postDocument.data() as Post, id: postDocument.id } : undefined;
};

export const savePost = async (id: string, post: Post) => {
	await setDoc(doc(db, 'julia', 'data', 'posts', id), post);
};

export const deletePost = async (id: string) => {
	await deleteDoc(doc(db, 'julia', 'data', 'posts', id));
};

export const addPost = async (link: string) => {
	const docRef = await addDoc(collection(db, 'julia', 'data', 'posts'), {
		link,
		headline: '',
		details: '',
		image: '',
		paragraphs: [],
	});
};
