const client = require("../config/db");
exports.addTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const originalDescription = description.trim();

    const createUser = await client.query(
      `INSERT INTO todo_user(id, description) VALUES('${req.id}','${originalDescription}') RETURNING *`
    );

    return res.json({
      statusCode: 201,
      message: "added successfully",
      data: createUser.rows,
    });
  } catch (e) {
    // console.log(e);
    // const duplicateKeyError =
    //   'duplicate key value violates unique constraint "todo_user_description_key"';
    // if (e == duplicateKeyError) {
    //   return res.json({
    //     statusCode: 400,
    //     message: "description already exist",
    //   });
    // }
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.editTodo = async (req, res) => {
  try {
    const id = req.params.id;

    if (Number.isNaN(parseInt(number)) === true) {
      return res.json({
        statusCode: 400,
        message: "id type is string",
      });
    }

    const number = id.replace(/[' "]+/g, "");
    const { description } = req.body;

    const originalDescription = description.trim();
    const findDescription = await client.query(
      `SELECT * FROM todo_user WHERE todoid = '${number}'`
    );
    if (findDescription.rows.length == 0) {
      return res.json({
        statusCode: 400,
        message: "invalid id ",
      });
    }

    const updateTodo = await client.query(
      `UPDATE todo_user SET description = '${originalDescription}', id = ${req.id} WHERE todoid = ${number}`
    );

    return res.json({
      statusCode: 200,
      message: "updated successfully",
    });
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    if (Number.isNaN(parseInt(number)) === true) {
      return res.json({
        statusCode: 400,
        message: "id type is string",
      });
    }

    const number = id.replace(/[' "]+/g, "");
    console.log(number);
    const findData = await client.query(
      `SELECT * FROM todo_user WHERE todoid=${number}`
    );
    if (findData.rows.length == 0) {
      return res.json({
        statusCode: 400,
        message: "invalid credential",
      });
    }
    const deleteData = await client.query(
      `DELETE FROM todo_user WHERE todoid = ${number}`
    );

    return res.json({
      statusCode: 200,
      message: "deleted successfully",
    });
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.showAllTodoForOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const number = id.replace(/[' "]+/g, "");

    if (Number.isNaN(parseInt(number)) === true) {
      return res.json({
        statusCode: 400,
        message: "id type is string",
      });
    }
    // const findData = await client.query(
    //   `SELECT email FROM userdata LEFT OUTER JOIN todo_user ON todo_user.id=${id}`
    // );
    
    const findData = await client.query(
      `SELECT * FROM todo_user WHERE id= ${number} `
    );

    if (findData.rows.length == 0) {
      return res.json({
        statusCode: 404,
        message: "data not found",
      });
    }

    // Select columns from table_name1 LEFT OUTER JOIN table_name2 on table_name1.column = table_name2.column;
    return res.json({
      statusCode: 200,
      data: findData.rows,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      statusCode: 200,
      message: e.message,
    });
  }
};

exports.cheacked = async (req, res) => {
  try {
    const id = req.params.id;
    const number = id.replace(/[' "]+/g, "");
    if (Number.isNaN(parseInt(number)) === true) {
      return res.json({
        statusCode: 400,
        message: "id type is string",
      });
    }

    const findData = await client.query(
      `SELECT * FROM todo_user WHERE todoid=${number}`
    );
    if (findData.rows.length == 0) {
      return res.json({
        statusCode: 400,
        message: "invalid credential",
      });
    }
    for (let element of findData.rows) {
      if (element.ischeacked === false) {
        const updateTodo = await client.query(
          `UPDATE todo_user SET ischeacked = '${true}', id = ${
            req.id
          } WHERE todoid = ${number}`
        );
        return res.json({
          statusCode: 200,
          message: "cheacked successfully",
        });
      } else {
        const updateTodo = await client.query(
          `UPDATE todo_user SET ischeacked = '${false}', id = ${
            req.id
          } WHERE todoid = ${number}`
        );
        return res.json({
          statusCode: 200,
          message: "uncheacked successfully",
        });
      }
    }
  } catch (e) {
    return res.json({
      statusCode: 400,
      message: e.message,
    });
  }
};
