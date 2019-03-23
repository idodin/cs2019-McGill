import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config();


export function jwtSign(username: string, password: string): string {
    let token = jwt.sign({email: username, password: password},
        process.env.JWT_SECRET,
        {expiresIn: '24h'});
    return token
}

export function jwtDecode(token: string){
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
        if(err){
            return {};
        } else {
            return decoded;
        }
    });
}

