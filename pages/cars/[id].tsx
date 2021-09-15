import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

export default function Car({car}) {
    const router = useRouter()
    const { id } = router.query

    return (<>
        <Head>
            <title>{car.color} {car.id} </title>
        </Head>
        <h1> Hello {id} </h1>
        <Image src={car.image} alt={car.id} width='300px' height='200px'></Image>
    </>)
}

/**
 * NextJs server side rendring for fetching the data to the rendered page
 * @param {*} params 
 * @returns 
 */
export async function getServerSideProps({params}) {

    const req = await fetch(`http://localhost:3000/${params.id}.json`)
    const data = await req.json()

    return {
        props: {
            car: data
        },
    }
}


/**
 * NextJs server side prerendring (static rendering) for fetching the data to the rendered page
 * tells next to prerender page
 * @param {*} params 
 * @returns 
 */
// export async function getStaticProps({params}) {
//     const req = await fetch(`http://localhost:3000/${params.id}.json`)
//     const data = await req.json()

//     return {
//         props: {
//             car: data
//         },
//     }
// }


/**
 * NextJs server side prerendring (static rendering) for fetching the data to the rendered page
 * tells next which dynamic pages to prerendr
 * @param {*} params 
 * @returns 
 */
// export async function getStaticPaths() {
//     const req = await fetch(`http://localhost:3000/cars.json`)
//     const data = await req.json()

//     const paths = data.map(car => {
//         return { params : { id: car}}
//     })

//     return {
//         paths,
//         fallback: false,
//     }
// }
