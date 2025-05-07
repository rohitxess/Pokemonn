import { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import  TypeCard  from "./TypeCard";
import Modal from "./Modal";

export default function PokeCard(props) {
    const { selectedPokemon } = props;
    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ skill, setSkill ] = useState(null);
    const [ loadingSkill, setLoadingSkill] = useState(false);


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

    async function fetchMoveData(move, moveUrl) {
        if (loadingSkill || !localStorage || !moveUrl){
            return 
        }

        let c ={}
        // key or object 'pokemon-moves'
        if (localStorage.getItem('pokemon-moves')) {
            c = JSON.parse(localStorage.getItem('pokemon-moves'))
        }  

        if (move in c ){
            setSkill(c[move]) // setting the setskill state and accessing the move in the cache
            console.log('Found move in cache')
            return 

        }
        //try catch if the move is not in the cache 
        try{
            setLoadingSkill(true)
            const res = await fetch(moveUrl)
            const moveData = await res.json()
            console.log('Fetched move from API', moveData)

            const description = moveData?.falvor_text_entries.filter(val => {
                return val.version_group.name == 'firered-leafgreen'
            })[0]?.flavor_text

            //creating an object to store the fetched data 
            const skillData = {
                name: move,
                description: description
            }
            setSkill(skillData)
            c[move]= skillData
            localStorage.setItem('pokemon-moves', JSON.stringify(c))

        } catch (err){
            console.log(err)
        } finally {
            setLoadingSkill(false)
        }
    }

    
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
            console.log('Found pokemon in cache')
            return 
        } 

        // if we haven't found the data in cache 

        try {
            setLoadingSkill(true)
        } catch(err){
            console.log(err)
        } finally {
            setLoadingSkill(false)
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
                console.log('Fetched pokemon data')

                cache[selectedPokemon] = pokemonData;
                localStorage.setItem('pokedex',JSON.stringify(cache))
                
            } catch(err){
                console.log(err.message)
                } finally {
                setLoading(false)
            }
        }

        fetchPokemonData();

            // 3. if we fetch from the api, make sure to save the information to cache for the next time 
    },[selectedPokemon])

    if (loading || !data) {
        return (
            <div>
                <h4> loading....</h4>
            </div> 
        )
    }

    return (
        <div className="poke-card">
            {skill && (
            <Modal handleCloseModal={() => {
                setSkill(null)
            }}> 
                <div>
                    <h6>Name</h6>
                    <h2 className="skill-name">{skill.name.replaceAll('-', ' ')}</h2>
                </div>
                <div>
                    <h6>Description</h6>
                    <h2>{skill.description}</h2>
                </div>
            </Modal>)}

            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex) => {
                    return (
                    <TypeCard key={typeIndex} type={typeObj?.type?.name} />
                    )
                })}
            </div>
             <div>
                <img className='default-img 'src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt={`${name}-large-img`} />
                <div className="img-container">
                    {imgList.map((spriteURL, spriteIndex) => {
                        const imgUrl =sprites[spriteURL]
                        return (
                            <img key={spriteIndex} src={imgUrl} alt={`${name}-img-${spriteURL}`}/>
                        )
                    })}
                </div>
                <h3>Stats</h3>
                <div className="stats-card">
                    {stats.map((statObj, statIndex ) => {
                        const {stat, baseStat} = statObj;
                        return (
                            <div className="stat-item" key={statIndex}>
                                <p>{stat?.name.replaceAll('_',' ')}</p>
                                <h4>{baseStat}</h4>
                            </div>
                        )
                    })}
                </div>
                <h3>Moves</h3>
                <div className="pokemon-move-grid">
                    {moves.map((movesObj, movesIndex ) => {
                            return (
                               <button className="button-card pokemon-move" key={movesIndex}
                               onClick={() => {
                                fetchMoveData(movesObj?.move?.name, movesObj?.move?.url)
                               }}>
                                <p>{movesObj?.move?.name.replaceAll('_', ' ')}</p>
                               </button>
                            )
                        })}
                </div>

            </div>   
        </div>
    )
}