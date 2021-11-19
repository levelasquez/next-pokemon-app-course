import type { NextPage } from 'next'

import Pokemon from '../components/Pokemon'

import type { PokemonList } from '../interfaces'

type Props = {
  pokemons: PokemonList[]
}

const Pokemons: NextPage<Props> = ({ pokemons }) => {
  return (
    <div>
      <p>Pokemons</p>
      <ul>
        {pokemons.map((pokemon) => (
          <Pokemon key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await response.json()

  return {
    props: { pokemons: data.results },
  }
}

export default Pokemons
