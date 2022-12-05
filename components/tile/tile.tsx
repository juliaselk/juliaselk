import NextImage from "next/image"
import Link from "next/link";
import styles from "../../styles/Tile.module.css"
import StaticImport from "../../types/StaticImport";

interface Props {
    image: StaticImport;
    headline: string;
    details: string;
    link: string;
}

const Tile = (props: Props) => {
    const { image, headline, details, link } = props;

    return <Link href={link}><NextImage alt={headline} src={image} width={300} height={200} />
        <h3>{headline}</h3>
        <p>{details}</p>
    </Link>
}

export default Tile