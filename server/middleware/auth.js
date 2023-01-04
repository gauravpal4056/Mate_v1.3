import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization");
        if(!token){
            return res.status(401).json({message:"access denied", status: 403})
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, JWT_SECRET)
        req.user = verified;
        next()
    } catch(err){
        console.log(err)
        return res.status(500).json({
            error: err.message
        })

    }
}