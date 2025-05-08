import { useState } from 'react'
import  PokeCard from './components/PokeCard'
import  Header  from './components/Header'
import  SideNav  from './components/SideNav' 
import TypeCard from './components/TypeCard'

function App() {
  const [ selectedPokemon, setSelectedPokemon ] = useState(0);
  const [ showSideMenu, setShowSideMenu ] = useState(true); // this does the opposite of what it should do
  function handleToggleMenu() {
    setShowSideMenu(!showSideMenu)
  }

  function handleCloseMenu() {
    setShowSideMenu(true)
  }

  return (
    <>
     <Header handleToggleMenu={handleToggleMenu}/>
     <SideNav 
     showSideMenu={showSideMenu}
     selectedPokemon={selectedPokemon} 
     setSelectedPokemon={setSelectedPokemon}
     handleCloseMenu={handleCloseMenu} />
     {/* <TypeCard /> */}
     <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}


export default App
