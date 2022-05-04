const jwt = require("jsonwebtoken");

exports.tokenVarify = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "A token is required for authentication",
        status: 400,
        success: false,
      });
    } else {
      const authHeader = req.headers.authorization;
      const bearerToken = authHeader.split(" ");
      const token = bearerToken[1];
      jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
        if (payload) {
          req.id = payload._id;
          next();
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid token",
            data: error.message,
          });
        }
      });
    }
  } catch (e) {
    return res.json({
      success: false,
      statusCode: 400,
      message: e.message,
    });
  }
};
