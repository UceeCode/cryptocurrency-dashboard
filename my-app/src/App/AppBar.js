import React from 'react';
import styled, {css} from 'styled-components';
import { AppContext } from './AppProvider';

const Logo = styled.div`
    font-size: 1.5em;
    font-weight: bold;
`

const Bar = styled.div`
    display: grid;
    margin-bottom: 40px;
    grid-template-columns: 180px auto 100px 100px;
`

const ControlButtonEle = styled.div`
    cursor: pointer;
    ${props => props.active && css`
        color: blue;
    `}
    ${props => props.hidden && css`
        display: none;
    `}
`

function ControlButton({name}){
    return (
        <AppContext.Consumer>
            {({firstVisit, page, setPage}) => (
            <ControlButtonEle 
                active={page === name}
                onClick={() => setPage(name)}
                hidden={firstVisit && name === 'dashboard'}
            >
                {toProperCase(name)}
            </ControlButtonEle>
            )}
        </AppContext.Consumer>
    )
}

function toProperCase(lower){
    return lower.charAt(0).toUpperCase() + lower.substr(1);
}

export default function(){
    return ( 
        <Bar>
            <Logo> CryptoDash </Logo>
            <div />
            <ControlButton active name="dashboard" />
            <ControlButton name="settings" />
        </Bar>
    )
}