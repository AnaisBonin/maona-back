const authRouter = require('express').Router();

const config = {
    client: {
      id: '<test>',
      secret: '<client-secret>'
    },
    auth: {
      tokenHost: 'https://accounts.google.com/o/oauth2/v2'
    }
  };
  
  const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');



const client = new AuthorizationCode(config);

const authorizationUri = client.authorizeURL({
    redirect_uri: 'http://localhost:3000/post_auth',
    scope: '<scope>',
    state: '<state>'
  });

authRouter.get('/', async (req, res) => {
   
      return res.redirect(authorizationUri);

  });