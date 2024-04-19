import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    customerName: '',
    customerComment: '',
    commentsList: [],
  }

  onDelete = id => {
    const {commentsList} = this.state
    const resultsList = commentsList.filter(each => each.id !== id)
    this.setState(prevState => ({...prevState, commentsList: [...resultsList]}))
  }

  likeOrLiked = eachComment => {
    const {commentsList} = this.state
    const index = commentsList.indexOf(eachComment)
    const Obj = commentsList[index]
    if (Obj.like === true) {
      Obj.like = false
    } else {
      Obj.like = true
    }
    commentsList.splice(index, 1, Obj)

    this.setState(prevState => ({
      ...prevState,
      commentsList,
    }))
  }

  renderComments = () => {
    const {commentsList} = this.state

    if (commentsList.length > 1) {
      return commentsList.map(each => (
        <CommentItem
          eachComment={each}
          key={each.id}
          initialContainerBackgroundClassNames={
            initialContainerBackgroundClassNames
          }
          onDelete={this.onDelete}
          onLike={this.likeOrLiked}
        />
      ))
    }
    return (
      <CommentItem
        eachComment={commentsList[0]}
        key={commentsList[0].id}
        initialContainerBackgroundClassNames={
          initialContainerBackgroundClassNames
        }
        onDelete={this.onDelete}
        onLike={this.likeOrLiked}
      />
    )
  }

  enteringUserName = event => {
    this.setState(prevState => ({
      ...prevState,
      customerName: event.target.value,
    }))
  }

  enteringCommentText = event => {
    this.setState(prevState => ({
      ...prevState,
      customerComment: event.target.value,
    }))
  }

  addComment = event => {
    event.preventDefault()

    const {customerName, customerComment} = this.state
    if (customerComment !== '' && customerName !== '') {
      const randomNumber = Math.ceil(
        Math.random() * (initialContainerBackgroundClassNames.length - 1),
      )
      const newComment = {
        id: uuidv4(),
        username: customerName,
        commentText: customerComment,
        like: false,
        randomNumber,
      }
      this.setState(prevState => ({
        customerName: '',
        customerComment: '',
        commentsList: [...prevState.commentsList, newComment],
      }))
    } else {
      window.alert('Enter Name and Comment')
    }
  }

  render() {
    const {customerName, customerComment, commentsList} = this.state

    return (
      <div className="main-container">
        <div className="inner-container">
          <div className="comment-input-container">
            <h1 className="title">Comments</h1>
            <div className="comments-content-container">
              <form className="left-container" onSubmit={this.addComment}>
                <p className="message">Say something about 4.o Technologies</p>
                <input
                  placeholder="Your Name"
                  value={customerName}
                  className="user-name-field"
                  onChange={this.enteringUserName}
                />
                <textarea
                  value={customerComment}
                  cols="50"
                  rows="8"
                  placeholder="Your Comment"
                  className="comment-box-input"
                  onChange={this.enteringCommentText}
                >
                  {customerComment}
                </textarea>

                <button type="submit" className="add-comment-btn">
                  Add Comment
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="right-image"
              />
            </div>
          </div>
          <hr />
          <div className="comments-lists-container">
            <p className="comments-count-and-text">
              <span>{commentsList.length}</span> Comments
            </p>
            <ul className="comments-list">
              {commentsList.length >= 1 ? this.renderComments() : null}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
