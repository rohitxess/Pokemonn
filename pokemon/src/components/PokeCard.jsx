import { useEffect, useState } from "react";

export function PokeCard(props) {
    const { selectedPokemon } = props;
    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(null);


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
            cache = JSON.parse(localStorage.getItem('pokemon'))
        }
            // 2. check if the selected pokemon is in the cache , otherwise  fetch 

        if (selectedPokemon in cache ){
            //read from cache 
        } else {

        }

        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseUrl = 'https://pokeapi.co/api/v2/'
                const suffix ='pokemon/' + selectedPokemon
                const finalUrl = baseUrl + suffix
                const res = await fetch(finalUrl)
                
            } catch(err){
                console.log(err)

            } finally {

            }
          

            })
        }

            // 3. if we fetch from the api, make sure to save the information to cache for the next time 
    },[selectedPokemon])
    return (
        <div>

        </div>
    )
}