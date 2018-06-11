import React from 'react'
import { Item, Rating, Segment } from 'semantic-ui-react'


export default function ReviewAvatar(props){
  const { user, text, stars } = props.review
  return (
    <Segment padded={true}>
    <Item.Group>
      <Item>
        <Item.Image floated='left' size='tiny' src={'/defaultPhotos/ompa.jpg'} />
        <Item.Content>
          <Item.Header>{user.email}</Item.Header>
          <Item.Meta>
            <Rating icon='star' defaultRating={stars} maxRating={5} disabled={true} />
          </Item.Meta>
          <Item.Description>{text}</Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
    </Segment>)
}
