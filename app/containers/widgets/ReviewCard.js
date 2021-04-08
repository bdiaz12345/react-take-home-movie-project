import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .15);
    width: 20rem;
    height: 30rem;
    margin: 2rem;

    &:hover {
        cursor: pointer;
    }
`

const Image = styled.img`
    object-fit: cover;
`

const Title = styled.h4`
    font-weight: bold;
`

const Date = styled.p``

const MPAARating = styled.p``

const CriticsPick = styled.p``

const ReviewCard = (props) => {
    const review = props.props
    return (
        <Wrapper onClick={() => {
            props.setSelectedReview(review)
            props.onClick()
            props.setImage(review.multimedia.src)
            props.setLink(review.link.url)
        }}>
            <Image src={review.multimedia.src} />
            <Title>Title: {review.display_title}</Title>
            <Date>Publication Date: {review.publication_date}</Date>
            <MPAARating>MPAA Rating: {review.mpaa_rating}</MPAARating>
            <CriticsPick>Critic's Pick: {review.critics_pick}</CriticsPick>
        </Wrapper>
    )
}

export default ReviewCard