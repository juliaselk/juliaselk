import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ReactNode } from 'react';
import styles from '../../styles/Scroller.module.scss';

interface Props {
	children: ReactNode;
}

const Scroller = (props: Props) => {
	const { children } = props;
	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(true);
	const container = useRef<HTMLDivElement>(null);

	const handleScroll = () => {
		const { scrollLeft, scrollWidth, clientWidth } = container.current!;
		setAtStart(!scrollLeft);
		setAtEnd(scrollLeft + clientWidth === scrollWidth);
	};

	useEffect(handleScroll, []);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(handleScroll);
		resizeObserver.observe(container.current!);
		return () => resizeObserver.disconnect();
	}, []);

	const handlePreviousClick = () => {
		const child = Array.from(container.current!.children)
			.reverse()
			.find((_child, i) => {
				const child = _child as HTMLElement;
				return child.offsetLeft < container.current!.scrollLeft;
			}) as HTMLElement;
		if (child) {
			container.current!.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
		}
	};

	const handleNextClick = () => {
		const child = Array.from(container.current!.children).find((_child, i) => {
			const child = _child as HTMLElement;
			return child.offsetLeft >= container.current!.scrollLeft;
		}) as HTMLElement;
		container.current!.scrollTo({ left: child.offsetLeft + child.offsetWidth, behavior: 'smooth' });
	};

	return (
		<div className={styles.wrapper}>
			<div ref={container} onScroll={handleScroll} className={styles.container}>
				{children}
			</div>
			{!atStart && (
				<div onClick={handlePreviousClick} className={styles.previous}>
					&lt;
				</div>
			)}
			{!atEnd && (
				<div onClick={handleNextClick} className={styles.next}>
					&gt;
				</div>
			)}
		</div>
	);
};

export default Scroller;
