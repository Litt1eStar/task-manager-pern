export const getCurrentUser = async(req, res) => {
    const user = req.user;
    
    if(!user){
        return res.status(500).json({error: "Token is Invalid"})
    }

    res.status(200).json(user)
}