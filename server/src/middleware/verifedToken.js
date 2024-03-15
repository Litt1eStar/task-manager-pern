import jwt from "jsonwebtoken";

export const verifedToken = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.SECRET);
    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    res.clearCookie("token");
    next();
  }
};
