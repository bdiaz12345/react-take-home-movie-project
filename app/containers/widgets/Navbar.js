import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// JSX styles

const Wrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100vw;
    background: #2211c5;
`

const Title = styled.h1`
    color: white;
    text-align: center;

    @media (max-width: 400px) {
        font-size: 25px;
    }
`

const Navbar = () => {
    return (
        <Wrapper>
            <Link style={{color: 'white', fontSize: '20px', textAlign: 'center'}} to='/'>Browse Reviews</Link>
            <Title>Movie Critic Reviews</Title>
            <Link style={{color: 'white', fontSize: '20px', textAlign: 'center'}} to='/critics'>Browse Critics</Link>
        </Wrapper>
    )
}

export default Navbar