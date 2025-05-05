import { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import  TypeCard  from "./TypeCard";

export default function PokeCard(props) {
    const { selectedPokemon } = props;
    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);


    const { name, height, abilities , stats, types, moves, sprites } = data  || {}

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]){
            return false 
        }

        if (['versions', 'other'].includes(val)){
            return false 
        }
        return true 
    })
    useEffect(() => {
        // callback function 
        // if loading, exit logic localstorage to check the cached data 
        if (loading || !localStorage){
            return 
        }
        //check if the selected pokemon information is available in the cache  
            // 1. define the cache 
        let cache = {}
        if (localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }
            // 2. check if the selected pokemon is in the cache , otherwise  fetch 

        if (selectedPokemon in cache ){
            //read from cache 
            setData(cache[selectedPokemon])
            return 
        } else {

        }
        // we passed all the cache stuff to no avail and now need to fetch the data from the API 
        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseUrl = 'https://pokeapi.co/api/v2/'
                const suffix ='pokemon/' + getPokedexNumber(selectedPokemon)
                const finalUrl = baseUrl + suffix
                const res = await fetch(finalUrl)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log(pokemonData)

                cache[selectedPokemon] = pokemonData;
                localStorage.setItem(JSON.stringify(cache))
                
            } catch(err){
                console.log(err.message)
                } finally {
                setLoading(false)
            }
        }

        fetchPokemonData();

            // 3. if we fetch from the api, make sure to save the information to cache for the next time 
    },[selectedPokemon])

    if (loading) {
        return (
            <div>
                <h4> loading....</h4>
            </div> 
        )
    }

    return (
        <div className="poke-card">
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {/* {types.map((typeObj, typeIndex) => {
                    return (
                    <TypeCard key={typeIndex} type={typeObj?.type?.name} />
                    )
                })} */}
            </div>
             <div>
                <img className='default-img 'src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt={`${name}-large-img`} />
                <div>
                    {}
                </div>
            </div>   
        </div>
    )
}