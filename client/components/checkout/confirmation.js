import React from 'react'
import { Image, Message, Icon } from 'semantic-ui-react'

const Confirmation = (props) => {
  const { email } = props

  return (
    <div id="confirmation">
      <div>
        <Message
          success
          header='Your purchase was successful'
          content={`You should receive an email shortly at ${email}.`}
          icon="check circle"
        />
      </div>
      <div>
        <Image src="https://media.giphy.com/media/aluNZseuiIyB2/giphy.gif" size="large" centered />
      </div>
      {/* TODO: Add an order summary component */}
    </div>
  )
}

export default Confirmation
