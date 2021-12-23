import axios from "axios";
import { createContext, useEffect, useState } from "react"

const DataContext = createContext()
const DataContextProvider = (props) => {
    const [pokemonData, setPokemonData] = useState([]);
    const [searchedPokemonId, setSearchPokemonId] = useState()
    const [searchItemData, setSearchedItemData] = useState([])
    const [error, setError] = useState(false)
    const [offsetValue, setOffSetValue] = useState(0)
    const offsetIncrement = () => {
        setOffSetValue(offsetValue + 1);
    }
    const offsetDecrement = () => {
        if (offsetValue > 0) {
            setOffSetValue(offsetValue - 1);
        }
    }
    const SearchPokemon = async (name) => {
        try {
            let temp = []
            let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            if (res.status === 200) {
                temp.push(res.data)
                setSearchedItemData(temp)
                setSearchPokemonId(res.data.species.url.split("/")[6])
                setError()
            }
        } catch (e) {
            setError(true)
        }
    }
    useEffect(async () => {
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offsetValue * 20}`)
        setPokemonData(res.data.results)
    }, [offsetValue])
    return <DataContext.Provider value={{ pokemonData, SearchPokemon, searchedPokemonId, searchItemData, error, offsetDecrement, offsetIncrement, offsetValue }}>
        {props.children}
    </DataContext.Provider>
}

export default DataContext;
export { DataContextProvider };