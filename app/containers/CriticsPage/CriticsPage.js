import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Particles from 'react-particles-js'

import data from '../../../static/critics.json'

import Navbar from '../widgets/Navbar'

const Wrapper = styled.div`
  background: #1faab7;
`

const Card = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const Name = styled.h4`
  color: white;
`

const Reviews = styled.h6`
  color: white;
`

const CriticsPick = styled.h6`
  color: white;
`

const Image = styled.img`
  width: 20rem;
  height: 30rem;
`

const Bio = styled.p`
  color: white;
`

const CardWrapper = styled.div`
  margin-top: 5rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CriticsPage = (props) => {
  const [critics, setCritics] = useState([])
  const [reviews, setReviews] = useState([])

  const critic_names = []

  let numberOfReviews = 0
  let numberOfCriticsPicks = 0

  const algorithm = ()=>{
      for(let i in critics){
        critic_names.push(critics[i].display_name.toUpperCase())
      }
      for(let i in critic_names){
        const reviewer = data.map((item) =>{
          if (item.byline === critic_names[i]) {
            return item.byline
          };;
        });
      }
  }

  const findReviews = (name) => {
    props.resources.reviews.data.forEach(review => {
      if (review.byline === name) {
        numberOfReviews = numberOfReviews + 1
        if (review.critics_pick === 1) {
          numberOfCriticsPicks = numberOfCriticsPicks + 1
        }
      }
    })
  }

  useEffect(() => {
    setCritics(data)
    setReviews(props.resources.reviews.data)
  }, [])

  return (
      <Wrapper>
          <Navbar />
          <CardWrapper>
          
          {critics.map(critic => {
            algorithm()
            numberOfReviews = 0
            numberOfCriticsPicks = 0
            findReviews(critic.display_name.toUpperCase())
            return (
                <Card>
                  <Image src={critic.multimedia !== null ? critic.multimedia.resource.src : 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'} />
                  <Name>{critic.display_name}</Name>
                  <Reviews>Number of Reviews: {numberOfReviews}</Reviews>
                  <CriticsPick>Critic's Picks: {numberOfCriticsPicks}</CriticsPick>
                  <Bio>Bio: {critic.bio}</Bio>
                </Card>
            )
          })}
          </CardWrapper>
      </Wrapper>
  )
}

const mapStateToProps = (state, ownProps) => {
  return state
}
  
export default compose(
  connect(
    mapStateToProps
  )
)(CriticsPage)