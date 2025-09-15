import { v4 as uuidv4 } from 'uuid';
//create a unique id for the cookie then send in a response
// make sure the current request knows about the knewly made cookie. 
export default function cookieHandler(req, res, next) {
    if(!req.cookies.userSession)
    {
        const userSession = uuidv4();
        res.cookie('userSession', userSession, {
            maxAge: 7*24*60*60*1000,// max age is 7 days
            httpOnly: true
        });
        req.userSession = userSession;
    }
    else{
        req.userSession = req.cookies.userSession;
    }
  next();
}
