import React from 'react'


export const ReviewAvatar = (props)=> {
  const { user, text, stars } = props.review
  return(
    <div className="reviewAvatarContainer">
      <img src={'./defaultPhotos/ompa.jpg'} />
      <h2>{user.email}</h2>
      <p>{stars}</p>
      <p>{text}</p>
    </div>
  )
}
