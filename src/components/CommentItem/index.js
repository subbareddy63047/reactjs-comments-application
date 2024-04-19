// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {
    eachComment,
    initialContainerBackgroundClassNames,
    onDelete,
    onLike,
  } = props
  const {username, commentText, like, randomNumber, id} = eachComment

  const randomClass = initialContainerBackgroundClassNames[randomNumber]

  const deleteButtonClicked = () => {
    onDelete(id)
  }

  const likeButtonClicked = () => {
    onLike(eachComment)
  }

  return (
    <li className="each-comment">
      <div className="comment-details-container">
        <div className={`first-letter ${randomClass}`}>
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="person-details-container">
          <div className="person-name-time-container">
            <h1 className="person-name">{username}</h1>
            <p className="commit-post-time">
              {formatDistanceToNow(new Date())}
            </p>
          </div>
          <p className="comment-text">{commentText}</p>
        </div>
      </div>
      <div className="comment-like-delete-container">
        <button
          type="button"
          className="like-liked-btn"
          onClick={likeButtonClicked}
        >
          {like ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png"
              alt="liked"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png"
              alt="like"
            />
          )}
          {like ? 'Liked' : 'Like'}
        </button>

        <button
          type="button"
          className="delete-btn"
          data-testid="delete"
          onClick={deleteButtonClicked}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
