import React from "react";
import styled, {css} from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3 } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";


const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        ${fontSize3}
    `}
`

function PriceTile({sym, data}){
    
    return (
        <PriceTileStyled>
            <CoinHeaderGridStyled>
                <div> {sym} </div>
                <div> {data.CHANGEPCTDAY} </div>
            </CoinHeaderGridStyled>
        </PriceTileStyled>
    );
}

export default function ({price, index}) {
    let sym = Object.keys(price)[0];
    let data = price[sym]['USD'];
    return (
        <PriceTile compact={index >= 5}>
            {sym} {data.PRICE} 
        </PriceTile>
    )
}