import React from 'react'
import { Image, Message, Icon } from 'semantic-ui-react'
import { ConfirmationSummary } from '../'

const Confirmation = ({ order }) => {
  return (
    <div id="confirmation">
      <div>
        <Message
          success
          header='Your purchase was successful'
          content={`You should receive an email shortly at ${order.email}.`}
          icon="check circle"
        />
      </div>
      <div>
        <Image src="https://media.giphy.com/media/aluNZseuiIyB2/giphy.gif" size="large" centered />
      </div>
      <ConfirmationSummary order={order} />
    </div>
  )
}

export default Confirmation
