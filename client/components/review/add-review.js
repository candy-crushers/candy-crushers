import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Rating, TextArea, Button, Message } from 'semantic-ui-react'
import { createPostReviewThunk } from '../../store'

const initialState = {
  text: '',
  stars: 0,
  error: ''
}

class AddReview extends Component {
  constructor () {
    super()
    this.state = initialState
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRate = (event, { rating }) => {
    this.setState({
      stars: rating,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const minReviewLength = 5
    if (this.state.text.length >= minReviewLength) {
      const review = {...this.state, userId: this.props.userId, productId: this.props.productId}
      this.props.submitReview(review)
      this.setState(initialState)
    } else {
      this.setState({
        error: `A review must be at least ${minReviewLength} characters in length`
      })
    }
  }

  handleDismiss = () => {
    this.setState({
      error: ''
    })
  }

  render () {
    // Don't show the form if the user is not logged in
    if (!this.props.userId) return <div />

    return (
      <div>
        {this.state.error && <Message onDismiss={this.handleDismiss} size="small" negative>{this.state.error}</Message>}
        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <TextArea name="text" value={this.state.text} autoHeight placeholder='Leave a review' rows={3} />
          <Rating icon="star" name="stars" maxRating={5} onRate={this.handleRate} rating={this.state.stars} />
          <Button positive type="submit" disabled={this.state.stars === 0}>Save</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    productId: state.singleProduct.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitReview: (review) => dispatch(createPostReviewThunk(review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview)
