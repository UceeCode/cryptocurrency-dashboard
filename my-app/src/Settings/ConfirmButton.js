import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';

const ConfirmedButton = styled.div`
    margin: 20px;
    color: green;
    cursor: pointer;
`;

const CenterDiv = styled.div`
    display: grid;
    justify-content: center;
`;

export default function ConfirmButton() {
    return (
        <AppContext.Consumer>
            {({ confirmFavorites }) => 
                <CenterDiv>
                    <ConfirmedButton onClick={confirmFavorites}>
                        Confirm Favorites
                    </ConfirmedButton>
                </CenterDiv>
            }
        </AppContext.Consumer>
    );
}
