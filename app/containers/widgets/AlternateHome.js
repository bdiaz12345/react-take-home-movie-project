import React from 'react'
import styled from 'styled-components'

import Particles from 'react-particles-js'

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #1faab7;
`

const TitleDiv = styled.div`
    border-radius: .375rem;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .15);
    width: 40%;
    height: 20%;
    background: white;

    @media (max-width: 400px) {
        height: 30%
    }
`

const Button = styled.button``

const Subtitle = styled.h6`
    text-align: center;
    font-size: 15px;
    color: #1faab7;
`

const Title = styled.h1`
    text-align: center;
    color: #1faab7;
`

const AlternateHome = (props) => {
    console.log(props)
    return (
        <Wrapper onClick={() => {
            props.setReviews(props.data)
        }}>
            <TitleDiv>
                <Title>Movie Critic Reviews</Title>
                <Subtitle>Click Anywhere</Subtitle>
            </TitleDiv>
            <Particles 
              params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			}
            		}
            	}}
              style={{
                width: '100%',
                position: 'fixed',
                left: '0',
                top: '0',
                height: '100%' 
              }}
            />
        </Wrapper>
    )
}

export default AlternateHome