import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet' // Header Generator
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'

import hesImg from 'images/hes.png'
import { getMovieReviews } from 'resources/reviews/reviews.actions'

import styled from 'styled-components'
import ReviewCard from '../widgets/ReviewCard'
import AlternateHome from '../widgets/AlternateHome'
import Pagination from 'react-js-pagination'
import SearchFilter from '../widgets/SearchFilter'
import { update } from 'lodash'
import Select from 'react-select'
import  Modal from 'react-modal'
import Navbar from '../widgets/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'

const Wrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  background: #1faab7;
  justify-content: space-evenly;
  min-height: 100vh;
  
`

const PaginationWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  background: #01707a;
  justify-content: space-evenly;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`

const Button = styled.button`
  background: #69cdd6;
  color: white;
  transition: .25s ease-in-out;
  border: none;

  &:hover {
    background: white;
    color: #69cdd6;
    cursor: pointer;
  }
`

const SearchDiv = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8rem 2rem 2rem 2rem;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`

const FilterBy = styled.p`
  color: white;
`

const FilterDiv = styled.div`
  margin: 2rem 0;
`

const InnerModal = styled.div`
`

const Title = styled.h1`
`

const Image = styled.img`
`

const Rating = styled.h4``

const CriticsPick = styled.h4``

const Headline = styled.h5``

const Summary = styled.p``

const Name = styled.h4``

const LinkToArticle = styled.a``

const styles = {
  content : {
    width: '60%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#app')

export function HomePage(props) {
  const [reviews, setReviews] = useState([])
  const history = useHistory()

  const [input, setInput] = useState('')
  const [selectedOption, setSelectedOption] = useState({value: 0, label: ''})
 
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState({activePage: 1})
  const [currentData, setCurrentData] = useState([])
  const [pastData, setPastData] = useState([])
  const [pageLimit, setPageLimit] = useState(20)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState({})
  const [image, setImage] = useState('')
  const [link, setLink] = useState('')

  const customStyles = {
    control: () => ({
      width: 200,
    })
  }

  useEffect(() => {
    if (input === '') {
      setCurrentData(reviews.slice(offset, offset + pageLimit))
    } else {
      let tempReviews = reviews.filter(review => {
        return review.display_title.toLowerCase().includes(input.toLowerCase())
      })
      setCurrentData(tempReviews.slice(offset, offset + pageLimit))
    }
  }, [offset, reviews, pageLimit])

  function getReviews() {
    return props.getMovieReviews()
  }

  useEffect(() => {
    getReviews()
    setReviews(reviews)
  }, [pageLimit])

  const updateInput = async (input) => {
    const filtered = props.data.filter(review => {
      return review.display_title.toLowerCase().includes(input.toLowerCase())
    })
    setReviews(filtered)
    setInput(input)
    if (input === '' && selectedOption === 0) {
      setReviews(props.data)
    }
  }

  useEffect(() => {
    if (selectedOption.value === 1) {
      setReviews(reviews.filter(review => {
        return review.mpaa_rating ? review : null
      }))
    } else if (selectedOption.value === 2) {
      setReviews(reviews.filter(review => {
        return review.publication_date ? review : null
      }))
    } else if (selectedOption.value === 3) {
      setReviews(reviews.filter(review => {
        return review.critics_pick === 1 ? review : null
      }))
    }
  }, [reviews])

  useEffect(() => {
    onFilter()
  }, [selectedOption])

  const onFilter = () => {
    if (selectedOption.value === 1) {
      setReviews(props.data.filter(review => {
        return review.mpaa_rating ? review : null
      }))
    } else if (selectedOption.value === 2) {
      setReviews(props.data.filter(review => {
        return review.publication_date ? review : null
      }))
    } else if (selectedOption.value === 3) {
      setReviews(props.data.filter(review => {
        return review.critics_pick === 1 ? review : null
      }))
    } else if (selectedOption.value === 0) {
      setReviews(props.data)
    }
  }

  const handlePageChange = (pageNumber) => {
    setOffset(pageLimit * (pageNumber - 1))
    setCurrentPage({activePage: pageNumber})
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  const options = [
    { value: 0, label: '' },
    { value: 1, label: 'MPAA Rating' },
    { value: 2, label: 'Publication Date' },
    { value: 3, label: "Critic's Pick" }
  ];

  return (
    <div style={{background: '#69cdd6', height: '100vh'}}>
      {reviews.length || input.length ? <Navbar /> : console.log('nope')}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={styles} contentLabel='Review'>
        <InnerModal>
          <Title>{selectedReview.display_title}</Title>
          <Image src={image} />
          <Rating>{selectedReview.mpaa_rating}</Rating>
          <CriticsPick>Critic's Pick: {selectedReview.critics_pick === 1 ? 'Yes' : 'No'}</CriticsPick>
          <Headline>{selectedReview.headline}</Headline>
          <Summary>{selectedReview.summary_short}</Summary>
          <Name>{selectedReview.byline}</Name>
          <LinkToArticle href={link} target='_blank'>View Full Article</LinkToArticle>
        </InnerModal>
      </Modal>
      <Wrapper>
          {reviews.length || input.length ?
          <div>
            <SearchDiv>
              <FilterDiv>
                <FilterBy>Filter By: </FilterBy>
                <Select styles={customStyles} defaultValue={selectedOption} onChange={setSelectedOption} options={options} />
              </FilterDiv>
            <SearchFilter input={input} onChange={updateInput} />
            </SearchDiv>
          </div> : console.log('nope')}
        {reviews.length || input.length ? currentData.map(review => {
          return (
              <ReviewCard props={review} onClick={openModal} setSelectedReview={setSelectedReview} setImage={setImage} setLink={setLink} />
          )
        }) : <AlternateHome setReviews={setReviews} data={props.data} />}
      </Wrapper>
      {currentData.length ? 
      <PaginationWrapper>
        <Button onClick={() => {
          setPageLimit(20)
        }}>Show 20</Button>
        <Pagination
          itemClass='page-item'
          linkClass='page-link'
          totalItemsCount={reviews.length}
          activePage={currentPage.activePage}
          itemsCountPerPage={pageLimit}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
        <Button onClick={() => {
          setPageLimit(50)
        }}>Show 50</Button>
    </PaginationWrapper> : console.log('nope')}
      
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    data: state.resources.reviews.data
  }
}

const mapDispatchToProps = dispatch => ({
  getMovieReviews: () => dispatch(getMovieReviews()),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomePage)
