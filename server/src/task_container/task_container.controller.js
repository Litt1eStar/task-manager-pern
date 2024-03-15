import pool from "../../db.js";

export const getAllItems = async (req, res) => {
  const user_id = req.user.id;

  const userQuery = await pool.query("SELECT id FROM users WHERE id=$1", [
    user_id,
  ]);
  const existedUser = userQuery.rows[0];

  if (!existedUser) {
    return res.status(400).json({ error: "User in not existed in Database" });
  }

  try {
    await pool.query(
      "SELECT * FROM task_container WHERE user_id=$1",
      [user_id],
      (error, results) => {
        if (error) {
          return res
            .status(400)
            .json({ error: "Failed To Query Data From Database" });
        }

        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async(req, res) => {
  const {id} = req.params;
  console.log(id)
  try {
    const query = await pool.query("SELECT * FROM task_container WHERE id=$1", [id]);
    const container = query.rows[0];

    if(!container){
      return res.status(400).json({error: "Container not existed"});
    }

    res.status(200).json(container)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

export const createTaskContainer = async (req, res) => {
  const user_id = req.user.id;
  const { name } = req.body;
  console.log(name)
  try {
    await pool.query(
      "INSERT INTO task_container(name, createAt, user_id)VALUES($1, NOW(), $2)",
      [name, user_id],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: "Failed to Create Container" });
        }
        
        res.status(200).json({ message: "Successfully Create New Container" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTaskContainer = async (req, res) => {
  const id = req.params.id;

  try {
    const query = await pool.query(
      "SELECT id FROM task_container WHERE id=$1",
      [id]
    );
    const existed = query.rows[0];
    if (!existed) {
      return res.status(400).json({ error: "Container Not Exist on Database" });
    }

    await pool.query(
      "DELETE FROM task_container WHERE id=$1",
      [id],
      (error, results) => {
        if (error) {
          return res
            .status(400)
            .json({ error: "Failed to Delete task_container" });
        }

        res.status(200).json({ message: "Successfully Delete task_container" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const setStatusOfContainer = async (req, res) => {
  const id = req.params.container_id;

  try {
    const query = await pool.query(
      "SELECT id, status FROM task_container WHERE id=$1",
      [id]
    );
    const existed = query.rows[0];

    if (!existed) {
      return res.status(400).json({ error: "Container Not Exist in Database" });
    }

    const updatedStatus = !existed.status;
    await pool.query(
      "UPDATE task_container SET status=$1 WHERE id=$2",
      [updatedStatus, id],
      (error, results) => {
        if (error) {
          return res
            .status(400)
            .json({ error: "Failed to Update task_container" });
        }

        res.status(200).json({ message: "Update Successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
