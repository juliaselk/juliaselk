import { useRouter } from "next/router"
import tiles from "../../data/tiles"
import Image from "../../components/image/image"

const Post = () => {
    const router = useRouter()
    const { id } = router.query

    const tile = tiles.find(tile => tile.link === id)
    if (!tile) { return 'not found' }
    return <div>
        <Image alt={tile.headline} src={tile.image} width={753} height={1209} />
        <h1>{tile.headline}</h1>
        {tile.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </div>
}

export default Post