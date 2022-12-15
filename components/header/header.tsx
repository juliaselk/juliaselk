import Link from 'next/link';
import { useState } from 'react';
import { menu } from '../../consts/svgs';
import styles from '../../styles/Header.module.scss';

const Header = () => {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<>
			<div className={styles.header}>
				<div onClick={handleClick}>{menu}</div>
				<Link href="/">hulia {open ? 'open' : 'closed'}</Link>
			</div>
			<div className={open ? styles.open : styles.menu}>
				<div>menu item 1</div>
				<div>menu item 2</div>
				<div>menu item 3</div>
			</div>
		</>
	);
};

export default Header;
