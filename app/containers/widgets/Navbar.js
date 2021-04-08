import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100vw;
    background: #01707a;
`

const Title = styled.h1`
    color: white;
`

const Navbar = () => {
    return (
        <Wrapper>
            <Link style={{color: 'white', fontSize: '2rem'}} to='/'>Browse Reviews</Link>
            <Title>Movie Critic Reviews</Title>
            <Link style={{color: 'white', fontSize: '2rem'}} to='/critics'>Browse Critics</Link>
        </Wrapper>
    )
}

export default Navbar