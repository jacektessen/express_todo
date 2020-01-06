const express = require("express");
const router = express.Router();
const { pool } = require("../../config");

router.get("/", (req, res) => {
  pool.query(`SELECT * FROM public.tasks ORDER BY id`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json({
      ok: true,
      total_count_tasks: results.rows.length,
      data: {
        tasks: results.rows
      }
    });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM public.tasks WHERE id=${id}`, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) return res.status(400).json("bad request");
    res.status(200).json({
      ok: true,
      data: {
        task: results.rows[0]
      }
    });
  });
});

router.post("/", (req, res) => {
  const { name, content, column } = req.body;
  pool.query(
    `INSERT INTO public.tasks ("column", content, name) VALUES ('${column}','${content}', '${name}') returning *;`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        ok: true,
        data: {
          task: results.rows[0]
        }
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, content, column } = req.body;
  pool.query(
    `UPDATE public.tasks SET name='${name}', content='${content}', "column"='${column}' WHERE id=${id} returning *`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({
        ok: true,
        data: {
          task: results.rows[0]
        }
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM public.tasks WHERE id=${id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(`Task deleted with ID: ${id}`);
  });
});

module.exports = router;
