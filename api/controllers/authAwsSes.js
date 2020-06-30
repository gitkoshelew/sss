const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const User = require('../models/User').user;
const { registerEmailParams } = require('../helpers/email');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(409).json({ message: 'Email is taken' });
    }

    const token = jwt.sign({ email, password, name }, process.env.JWT_ACCOUNT_ACTIVATION, {
      expiresIn: '10m',
    });

    const params = registerEmailParams(email, token);

    const data = await ses.sendEmail(params).promise();

    if (data) {
      return res.json({
        message: `Email has been sent to ${email}, follow the instructions to complete your registration!`,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errors: [e.message ? e.message : e],
      message: 'We could not verify your email. Please try again',
    });
  }
};
