import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config();


export function jwtSign(username: string, password: string): string {
    let token = jwt.sign({username: username, password: password},
        process.env.JWT_SECRET,
        {expiresIn: '24h'});
    return token
}

