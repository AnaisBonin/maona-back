const authRouter = require('express').Router();

const config = {
    client: {
      id: 'adc75027ec3b5481c50f',
      secret: '4aab791658428e5885257e9b3ad88dafb9908826'
    },
    auth: {
        tokenHost: 'https://github.com',
        tokenPath: '/login/oauth/access_token',
        authorizePath: '/login/oauth/authorize',
    }
  };
  
  const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');



const client = new AuthorizationCode(config);

const authorizationUri = client.authorizeURL({
    redirect_uri: 'http://localhost:8000/authentification/callback',
    scope: 'notifications',
    state: '3(#0/!~',
  });

  authRouter.get('/', (req, res) => {
    return res.send('Hello<br><a href="/authentification/auth" target="blank">Log in with Github</a>');
  });

  authRouter.get('/auth', async (req, res) => {
    console.log(authorizationUri)
    return res.redirect(authorizationUri);

  });

  authRouter.get('/callback', async (req, res) => {
    const { code } = req.query;
    const options = {
      code,
    };

    try {
      const accessToken = await client.getToken(options);

      console.log('The resulting token: ', accessToken.token);

      return res.status(200).json(accessToken.token);
    } catch (error) {
      console.error('Access Token Error', error.message);
      return res.status(500).json('Authentication failed');
    }
  });



  module.exports = authRouter;