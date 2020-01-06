const db = require("../db");

const Tasks = {
  async getAll(req, res) {
    const findAllQuery = "SELECT * FROM public.tasks WHERE user_id=$1";
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({
        ok: true,
        total_count_tasks: rowCount,
        data: {
          tasks: rows
        }
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getOne(req, res) {
    const findOneQuery = "SELECT * FROM public.tasks WHERE id=$1 AND user_id=$2";
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "task not found" });
      }
      return res.status(200).send({ ok: true, data: { task: rows[0] } });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async create(req, res) {
    const createQuery = `INSERT INTO
      public.tasks ("column", content, name, "user_id")
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [req.body.column, req.body.content, req.body.name, req.user.id];
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({ ok: true, data: { task: rows[0] } });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async update(req, res) {
    const findOneQuery = "SELECT * FROM public.tasks WHERE id=$1 AND user_id=$2";
    const updateOneQuery =
      'UPDATE public.tasks SET name=$1, content=$2, "column"=$3 WHERE id=$4 AND user_id=$5 returning *';
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "task not found" });
      }
      const values = [
        req.body.name,
        req.body.content,
        req.body.column,
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send({ ok: true, data: { task: response.rows[0] } });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    const deleteQuery = "DELETE FROM public.tasks WHERE id=$1 AND user_id=$2 returning *";
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "task not found" });
      }
      return res.status(204).send({ message: "deleted" });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

module.exports = Tasks;
