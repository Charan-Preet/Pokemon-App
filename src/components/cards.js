import axios from "axios";
import { useContext, useState } from "react";
import DataContext from "../context/index";

function Cards() {
    const { pokemonData, searchItemData, searchedPokemonId, offsetIncrement, offsetDecrement, offsetValue } = useContext(DataContext)
    const [selectedItem, setSelectedItem] = useState([])
    const [selectedId, setSelectedId] = useState()
    async function showSelectedPokemon(data, id) {
        setSelectedId(id)
        let temp_data = []
        let res_data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.name}`)
        temp_data.push(res_data.data)
        setSelectedItem(temp_data)
    }
    const displaySearchedItems = () => {
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center link black dim db mw5 pa2 br2 ba b--black-10 shadow-1">
                <div className="grow">
                    <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${searchedPokemonId}.svg`} className="db w-100 br2 br--top" alt="Photo of a kitten looking menacing." />
                </div>
                <div className="pa2 ph3-ns pb3-ns">
                    <div className="dt w-100 mt1">
                        <div className="dtc">
                            <h1 className="f5 f4-ns mv0">Name:{" "}{searchItemData[0].name}</h1>
                            <h1 className="f5 f4-ns mv0">Weight:{" "}{searchItemData[0].weight}{" "}pounds</h1>
                            <h1 className="f5 f4-ns mv0">Height:{" "}{searchItemData[0].height}{" "}meters</h1>
                            <h1 className="f5 f4-ns mv0">Base Experience:{" "}{searchItemData[0].base_experience}{" "}</h1>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
    const displaySelected = () => {
        return (
            selectedItem.length > 0 && (
                <div className="flex flex-wrap w-90 justify-center">
                    <div className="w-50 pa3 mr2 link black dim db mw5 pa2 br3 ba b--black-10 shadow-1 grow">
                        <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${selectedId}.svg`} className="mw-100" alt="selected pokemon image" />
                    </div>
                    <div className="w-50 mt2 ml3">
                        <div className="tl">
                            <code>Name:{" "}<span style={{ fontWeight: "300" }}>{selectedItem[0].name}</span></code>
                        </div>
                        <br />
                        <div className="tl">
                            <code>Weight:{" "}<span style={{ fontWeight: "300" }}>{selectedItem[0].weight}</span></code>
                        </div>
                        <br />
                        <div className="tl">
                            <code>Height:{" "}<span style={{ fontWeight: "300" }}>{selectedItem[0].height}</span></code>
                        </div>
                        <br />
                    </div>
                </div>
            )
        )
    }
    const listItems = pokemonData.map((data) =>
        <article className="br2 ba dark-gray b--black-10 mv4 w-80 w-40-m w-40-l mw5 center br3 link black dim db mw5 pa2 br2 ba b--black-10 shadow-1">
            <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.url.split("/")[6]}.svg`} className="db w-100 br2 br--top" alt="Pokemon photo" />
            <div className="pa2 ph3-ns pb3-ns">
                <div className="dt w-100 mt1">
                    <div className="dtc">
                    </div>
                    <div className="dtc tr">
                        <h2 className="tc f3 mv0">{data.name}</h2>
                    </div>
                </div>
                <a className="f6 link dim ba ph3 pv2 mb2 dib hot-pink mt4 br3 w-100 pointer" onClick={() => showSelectedPokemon(data, data.url.split("/")[6])}>
                    Select
                </a>
            </div>
        </article>
    );
    return (
        <div>
            {searchedPokemonId ? (
                displaySearchedItems()
            ) : (
                <div>
                    {displaySelected()}
                    <div className="flex flex-wrap ml3 mr3 justify-around">
                        {listItems}
                    </div>
                    <div className="w-100 flex justify-center space-around">
                        <div className="flex justify-center w-30 items-center">
                            <div className="flex">
                                <div className="pointer" onClick={offsetDecrement}>
                                    <svg width="40" height="60" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                        <polyline points="30 10 10 30 30 50" stroke="rgba(0,0,0,0.5)" stroke-width="4" stroke-linecap="butt" fill="none" stroke-linejoin="round">&gt;</polyline>
                                    </svg>

                                </div>
                                <div className="gray b" style={{ lineHeight: "50px" }}>
                                    {offsetValue + 1}
                                </div>
                                <div className="center pointer" onClick={offsetIncrement}>
                                    <svg width="40" height="60" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                        <polyline points="10 10 30 30 10 50" stroke="rgba(0,0,0,0.5)" stroke-width="4" stroke-linecap="butt" fill="none" stroke-linejoin="round">&lt;</polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}

export default Cards;
