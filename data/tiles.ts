import polaroid from '../public/polaroid.png'

const foo = 'very'

const tiles = [
    {
        link: 'one', headline: 'headline 1', details: '1', image: polaroid, paragraphs: [
            'this is the spaghetti i made, it is vegan!',
            'i really like "farmers markets..."',
            'sometimes the weather is warm enough to swim at the beach.']
    },
    { link: 'two', headline: 'Hello', details: '1', image: polaroid, paragraphs: [] },
    { link: 'three', headline: `i'm ${foo} cool`, details: '1', image: polaroid, paragraphs: [] }
]

export default tiles
