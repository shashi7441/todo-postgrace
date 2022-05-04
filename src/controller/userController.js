const client = require("../config/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    const createUser = await client.query(
      `INSERT INTO userdata(email, password) VALUES('${emailTrim}', '${passwordTrim}') RETURNING *`
    );
    return res.json({
      statusCode: 201,
      message: "user signup successfully",
      data: createUser.rows,
    });
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.showUser = async (req, res) => {
  try {
    const id = req.params.id;
    const numberInt = id.replace(/[' "]+/g, "");
    if (Number.isNaN(parseInt(number)) === true) {
      return res.json({
        statusCode: 400,
        message: "id type is string",
      });
    }

    const query = `SELECT * FROM userdata WHERE id =${numberInt} `;
    const result = await client.query(query);
    if (result.rows.length == 0) {
      return res.json({
        statusCode: 404,
        message: "no data found",
      });
    }
    return res.json({
      statusCode: 200,
      message: result.rows,
    });
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.deleteOneUser = async (req, res) => {
  try {
    const id = req.id;
    const query = `DELETE FROM userdata WHERE id =${id};`;
    const findData = await client.query(
      `SELECT * FROM todo_user WHERE id=${id}`
    );
    if (findData.rows.length == 0) {
      return res.json({
        statusCode: 400,
        message: "already deleted",
      });
    }
    await client
      .query(query)
      .then((result) => {
        res.json({
          statusCode: 200,
          message: "delted data successfully",
        });
      })
      .catch((e) => {
        return res.json({
          statusCode: 400,
          message: e.message,
        });
      });
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailTrim = email.trim();
    const findQuery = `SELECT * FROM userdata WHERE email ='${emailTrim}' `;
    await client
      .query(findQuery)
      .then(async (result) => {
        if (result.rows.length === 0) {
          return res.json({
            statusCode: 404,
            message: "data not found",
          });
        }

        const databasePassword = result.rows;
        for (let passwords of databasePassword) {
          const passwordMatch = password === passwords.password;
          if (passwordMatch == false) {
            return res.json({
              statusCode: 400,
              message: "invalid credential",
            });
          } else {
            let ids = result.rows;
            for (let id of ids) {
              const jwtToken = await jwt.sign(
                { _id: id.id },
                process.env.SECRET_KEY,
                { expiresIn: "24h" }
              );
              return res.json({
                statusCode: 200,
                message: "login successfully",
                data: jwtToken,
              });
            }
          }
        }
      })
      .catch((e) => {
        return res.json({
          statusCode: 400,
          message: e.message,
        });
      });
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.showAllUser = async (req, res) => {
  try {
    const query = `SELECT * FROM userdata`;
    const result = await client.query(query);

    if (result.rows.length == 0) {
      return res.json({
        statusCode: 404,
        message: "data not found",
      });
    } else {
      return res.json({
        statusCode: 200,
        data: result.rows,
      });
    }
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};
