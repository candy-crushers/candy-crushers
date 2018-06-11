const router = require('express').Router()
const nodemailer = require('nodemailer')
const confirmTemplate = require('../../../emails/confirmation')
const shippedTemplate = require('../../../emails/shipped')
const deliveredTemplate = require('../../../emails/delivered')
const { Order } = require('../../db/models')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  }
})

// Do not want to overload email account when testing so have option to disable
if (process.env.SEND_EMAILS) {
  router.post('/confirmation', (req, res, next) => {
    const { to, order} = req.body
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL_TO,
      subject: `Candy Crushers Order Confirmation`,
      html: confirmTemplate(order)
    }

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        next(error)
      } else {
        res.sendStatus(201)
      }
    })
  })

  router.post('/shipped', async (req, res, next) => {
    const order = await Order.findById(req.body.id)

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL_TO,
      subject: `Your CandyCrushers.com Order ${order.id} has shipped!`,
      html: shippedTemplate(order)
    }

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        next(error)
      } else {
        res.sendStatus(201)
      }
    })
  })

  router.post('/delivered', async (req, res, next) => {
    const order = await Order.findById(req.body.id, {
      include: [{ all: true }]
    })

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL_TO,
      subject: `Your CandyCrushers.com Order ${order.id} has been delivered!`,
      html: deliveredTemplate(order)
    }

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        next(error)
      } else {
        res.sendStatus(201)
      }
    })
  })
}

module.exports = router
