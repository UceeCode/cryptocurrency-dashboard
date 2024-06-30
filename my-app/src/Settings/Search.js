import React from 'react'
import styled from 'styled-components'
import { backgroundColor2, fontSize2,  } from '../Shared/Styles'

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

export default function Search() {
  return (
    <SearchGrid>
      <h2>Search all coins:</h2>
      <SearchInput/>
    </SearchGrid>
  )
}
