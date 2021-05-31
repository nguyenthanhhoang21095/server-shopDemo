const handleToken = require("../common/jwtHelper");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashedPassword = (rawPass: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
            if (err) reject(err)
            bcrypt.hash(rawPass, salt, function (err: any, hash: string) {
                if (err) reject(err)
                resolve(hash);
            });
        });

    }).catch(err => console.error(err))
}

const checkPassword = (inputPass: string, hashedPass: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(inputPass, hashedPass, function (err: any, result: boolean) {
            if (err) reject(err);
            resolve(result)
        });
    }).catch(err => console.error(err))
}

module.exports = {
    hashedPassword,
    checkPassword,
}