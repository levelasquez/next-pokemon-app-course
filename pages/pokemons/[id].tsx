import Link from 'next/link'
import Image from 'next/image'

import { useRouter } from 'next/router'
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import type { Pokemon as PokemonType } from '../../interfaces'

type Props = {
  pokemon: PokemonType
}

const Pokemon: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>
        {pokemon.name} number #{pokemon.id}
      </h1>
      <Image src={pokemon.image} width={400} height={400} alt={pokemon.name} />
      <Link href="/">Home</Link>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params?.id ?? ''}`,
  )
  const data = await response.json()

  const pokemons: PokemonType = {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
  }

  return { props: { pokemon: pokemons } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }]

  return {
    paths,
    fallback: true,
  }
}

export default Pokemon
