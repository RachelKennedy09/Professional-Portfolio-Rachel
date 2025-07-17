import jwt from "jsonwebtoken";

//this function will be used to protect routes
export function verifyUser(req, res, next) {
    //req.headers.authorization grabs the token from the request
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Missing authorization header" });

    }

    const token = authHeader.split(" ")[1]; //Grab the token after "Bearer"

    try {
        const decoded = jwt.verify(token, "SECRET_KEY"); //Later, move SECRET_KEY to .env
        //jwt verify makes sure the token is real
        req.user = decoded; //save info for later (userId, role)
        next(); //allow the request to move on

    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token"})
    }
}