const express = require("express");
const router = express.Router();
const { pool } = require("../../config");

router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  pool.query(`SELECT * FROM public.settings WHERE user_id=${user_id}`, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) return res.status(400).json("bad request");
    res.status(200).json({
      ok: true,
      data: {
        settings: results.rows[0]
      }
    });
  });
});

router.post("/", (req, res) => {
  const { user_id } = req.body;
  pool.query(
    `INSERT INTO public.settings ("user_id") VALUES ('${user_id}') returning *;`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        ok: true,
        data: {
          settings: results.rows[0]
        }
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const {
    panel_1_color,
    panel_2_color,
    panel_3_color,
    panel_4_color,
    panel_1_name,
    panel_2_name,
    panel_3_name,
    panel_4_name,
    shadow_effect,
    user_id
  } = req.body;
  pool.query(
    `UPDATE public.settings SET 
      panel_1_color='${panel_1_color}', 
      panel_2_color='${panel_2_color}', 
      panel_3_color='${panel_3_color}', 
      panel_4_color='${panel_4_color}', 
      panel_1_name='${panel_1_name}', 
      panel_2_name='${panel_2_name}', 
      panel_3_name='${panel_3_name}', 
      panel_4_name='${panel_4_name}', 
      shadow_effect='${shadow_effect}', 
      user_id='${user_id}' 
    WHERE id=${id} returning *`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({
        ok: true,
        data: {
          settings: results.rows[0]
        }
      });
    }
  );
});

module.exports = router;
