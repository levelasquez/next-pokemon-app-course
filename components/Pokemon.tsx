import Link from 'next/link'

import type { PokemonList } from '../interfaces'

type Props = {
  pokemon: PokemonList
}

const Pokemon = ({ pokemon }: Props) => {
  const id = pokemon.url
    .split('/')
    .filter((value) => value)
    .pop()

  return (
    <li>
      <Link href={`/pokemons/${id}`}>{pokemon.name}</Link>
    </li>
  )
}

export default Pokemon
