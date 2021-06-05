const jwt = require('jsonwebtoken');
const { sha256 } = require('crypto-hash');

function generateAccessToken(user: Record<string, any>, secretSignature: string, tokenLife = '1h') {
    return new Promise((resolve, reject) => {
        const { id , fullName, account, role} = user
        const userData = {
            id,
            fullName,
            account,
            role,
        }

        hashedSecretKey(secretSignature).then((hashedKey) => {
            jwt.sign({ data: userData }, hashedKey, { algorithm: 'HS256', expiresIn: tokenLife }, (err: any, token: any) => {
                if (err) reject(err);
                resolve(token);
            });
        });
    })
}

function verifyAccessToken(token: string, secretKey: string) {
    return new Promise((resolve, reject) => {
        hashedSecretKey(secretKey).then(hashedKey => {
            jwt.verify(token, hashedKey, (err: any, decoded: any) => {
                if (err) reject(err);
                resolve(decoded)
            })
        });
    })
}

function hashedSecretKey (secretKey: string):Promise<string> {
    return new Promise((resolve, reject) => {
        sha256(secretKey).then((hashedKey:string) => {
            if (hashedKey && hashedKey !== secretKey) {
                resolve(hashedKey);
            }
            resolve(secretKey);
        })
    })
}
module.exports = {
    generateAccessToken,
    verifyAccessToken,
    hashedSecretKey,
}