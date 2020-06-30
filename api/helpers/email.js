exports.registerEmailParams = (email, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            <html>
              <h1 style="color:red;">Hello ${name}</h1>
              <p>Verify your email address</p>
              <p>Please use the following link to complete your registration</p>
              <p>${process.env.WP_URL}/auth/activate/${token}</p>
            </html>`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Complete your registration`,
      },
    },
  };
};
