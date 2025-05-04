import { useState } from 'react'
import { PokeCard } from './components/PokeCard'
import { Header } from './components/Header'
import { SideNav } from './components/SideNav' 

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0)

  return (
    <>
     <Header />
     <SideNav selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
     <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}


export default App
