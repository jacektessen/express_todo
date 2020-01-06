const db = require("../db");

const Settings = {
  async getOne(req, res) {
    const findOneQuery = "SELECT * FROM public.settings WHERE user_id=$1";
    try {
      const { rows } = await db.query(findOneQuery, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "settings not found" });
      }
      return res.status(200).send({ ok: true, data: { settings: rows[0] } });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async create(req, res) {
    const findOneQuery = "SELECT * FROM public.settings WHERE user_id=$1";
    const createQuery = 'INSERT INTO public.settings ("user_id") VALUES ($1) returning *';
    try {
      const { rows } = await db.query(findOneQuery, [req.user.id]);
      if (rows[0]) {
        return res.status(400).send({ message: "Settings already exists" });
      }
      const response = await db.query(createQuery, [req.user.id]);
      return res.status(201).send({ ok: true, data: { settings: response.rows[0] } });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async update(req, res) {
    const findOneQuery = "SELECT * FROM public.settings WHERE user_id=$1";
    const updateOneQuery = `UPDATE public.settings SET
          panel_1_color=$1,
          panel_2_color=$2,
          panel_3_color=$3,
          panel_4_color=$4,
          panel_1_name=$5,
          panel_2_name=$6,
          panel_3_name=$7,
          panel_4_name=$8,
          shadow_effect=$9
        WHERE user_id=$10 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "settings not found" });
      }
      const values = [
        req.body.panel_1_color,
        req.body.panel_2_color,
        req.body.panel_3_color,
        req.body.panel_4_color,
        req.body.panel_1_name,
        req.body.panel_2_name,
        req.body.panel_3_name,
        req.body.panel_4_name,
        req.body.shadow_effect,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send({ ok: true, data: { settings: response.rows[0] } });
    } catch (err) {
      return res.status(400).send(err);
    }
  }
};

module.exports = Settings;
