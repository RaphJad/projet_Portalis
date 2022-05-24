//imports
var jwt = require('jsonwebtoken');


const JWT_SIGN_SECRET = 'q65g4vtr655b1d5g1qef6q5ss6f5h4bq68d4hjy6r8jt4hds6fh4n68dq1bsd6fj46dfsb6bdf6b8s4h6fg84n';
//exported functions
module.exports = {
    generateTokenForLawyer: function(lawyerData){
        return jwt.sign({
            lawyer_id: lawyerData.lawyer_id,
            firstname: lawyerData.firstname,
            lastname: lawyerData.lastname
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}