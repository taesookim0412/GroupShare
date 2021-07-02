import fs = require('fs');
import jwt = require('jsonwebtoken');
import path = require("path")


let getKeysDirectory = () => {
    const currpath = __dirname.replace(/\\/g, "/")
    const strs = currpath.split("/")
    //Outside of repo directory, into keys directory.
    if(strs.includes("build")){
        return path.join(__dirname, "..", "..", "..", "..", "keys")
    }
    else{
        return path.join(__dirname, "..", "..", "..", "keys")
    }
}
const privateKEY = fs.readFileSync(path.join(getKeysDirectory(), "privatekey.ppk"), 'utf8');
const publicKEY = fs.readFileSync(path.join(getKeysDirectory(), "public.key"), 'utf8');
getKeysDirectory = () => ""

module.exports = {
    sign: (payload:jwt.JwtPayload, username: string) => {
        const sOptions = {
            issuer: "Authorization/User/GroupShare",
            subject: username,
        }
        let signOptions:jwt.SignOptions = {
            algorithm: "RS256",
            expiresIn: "1d",
            issuer: sOptions.issuer,
            subject: sOptions.subject
        };
        return jwt.sign(payload, privateKEY, signOptions);
    },

    verify: (token:string, username:string) => {
        if (username === undefined || username === null || username === ""){
            return false;
        }
        const Option = {
            issuer: "Authorization/User/GroupShare",
            subject: username,
        };
        const verifyOptions = {
            issuer: Option.issuer,
            subject: Option.subject,
            expiresIn: "1d",
            algorithm: "RS256"
        };
        try{
            return jwt.verify(token, publicKEY, verifyOptions);
        } catch(err) {
            return false;
        }
    },
    decode: (token:string) => {
        return jwt.decode(token, {complete: true});
    }
}
export function sign(arg0: { auth: string; }, username: string) {
    throw new Error('Function not implemented.');
}

