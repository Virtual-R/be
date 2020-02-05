const jwt = require('jsonwebtoken');
// const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
    console.log(req)
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;
  if (token) {
    jwt.verify(token, secret, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: 'Not Authorized' });
      } else {
        req.user = decodeToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'UnAuthorized' });
  }
};

// module.exports = () => {
//     return (req, res, next) => {
        
//             const token = req.headers.token
//             if(token) {
//                 jwt.verify(token, secrets.jwt, (err, decodeToken) => {
//                     if(err) { 
//                         res.status(401).json({message: "Unauthorized"})
//                     }
//                 })
//             }

//             req.userId = decoded.subject
//             next()
        
        
//             return res.status(401).json({
//                 message: 'Invalid credentials.'
//             })
//         }
//     }
// }