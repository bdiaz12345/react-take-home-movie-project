import React from 'react'
import styled from 'styled-components'

// JSX styles

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border: 1px solid #e7e7e7;
    width: 15rem;
    height: 22rem;
    margin: 2rem;

    &:hover {
        cursor: pointer;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .15);
    }
`

const Image = styled.img`
    object-fit: cover;
    height: 50%;
`

const Title = styled.h4`
    font-size: 20px;
    text-align: center;
`

const Date = styled.p`
    text-align: center;
`

const MPAARating = styled.p`
    text-align: center;
`

const CriticsPick = styled.p`
    text-align: center;
`

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
            <Title>{review.display_title}</Title>
            <Date>{review.publication_date}</Date>
            <MPAARating>MPAA Rating: {review.mpaa_rating !== '' ? review.mpaa_rating : 'none'}</MPAARating>
            <CriticsPick>Critic's Pick: {review.critics_pick === 1 ? 'Yes' : 'No'}</CriticsPick>
        </Wrapper>
    )
}

export default ReviewCard