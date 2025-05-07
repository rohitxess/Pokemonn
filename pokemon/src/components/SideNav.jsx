import { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(props) {
    const { selectedPokemon, setSelectedPokemon, handleToggleMenu, showSideModal } = props;
    const [ searchValue, setSearchValue ] = useState('');

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex)=> {
        
        // if full pokedex number includes the current search value, return true 
        if (getFullPokedexNumber(eleIndex).includes(searchValue)){
            return true 
        }
        // if the pokemon name includes the current search value, return true 
        if(ele.toLowerCase().includes(searchValue.toLowerCase())){
            return true 
        }
        // otherwise, exclude value from the array 

        return false 
    })
    return (
        <nav className={'' + (!show)}>
            <div className={"header"}>
                <button className="open-nav-button">
                    <i classname="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className="text-gradient">Pokedex</h1>
            </div>
            <input placeholder='E.g 001 or bulbasor'value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value)
            }}/>
            {filteredPokemon.map((pokemon, pokemonIndex) => {
                const truePokedexNumber = first151Pokemon.indexOf(pokemon)

                return (
                    <button onClick={() => {setSelectedPokemon(truePokedexNumber)}} key={pokemonIndex} className={'nav-card' + (pokemonIndex === selectedPokemon ? 'nav-card-selected': ' ')}>
                        <p>{getFullPokedexNumber(first151Pokemon.indexOf(pokemon))}</p>
                        <p>{pokemon}</p>                         
                    </button>
                )
            })}
        </nav>
    )
}