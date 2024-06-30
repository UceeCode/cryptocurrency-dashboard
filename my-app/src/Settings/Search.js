import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2,  } from '../Shared/Styles';
import { AppContext } from '../App/AppProvider';
import _, { result } from "lodash";
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 220px 1fr;
`

const SearchInput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    color: white;
    border: 1px solid white;
    place-self: center left;
    height: 45px;
    padding: 10px 45px
    border-radius: 6px
`

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
    //get all the coin symbols
    let coinSymbol = Object.keys(coinList);
    //get all coin name, map symbol to name
    let coinNames = coinSymbol.map(sym => coinList[sym].CoinName);
    let allStringsToSearch = coinSymbol.concat(coinNames);
    let fuzzyResults = fuzzy
        .filter(inputValue, allStringsToSearch, {})
        .map(result => result.string);
   
    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName;
        return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName));
    });
    setFilteredCoins(filteredCoins)

}, 500);

function filterCoins(e, setFilteredCoins, coinList){
    let inputValue = e.target.value;
    if(!inputValue){
        setFilteredCoins(null);
        return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins)
}

export default function Search() {
  return (
    <AppContext.Consumer>
        {({setFilteredCoins, coinList}) => 
            <SearchGrid>
                <h2>Search all coins:</h2>
                <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}/>
            </SearchGrid>
        }
    </AppContext.Consumer>
  )
}
