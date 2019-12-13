var express = require('express');
var router = express.Router();

const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: '52.220.252.63', database: 'store', user: 'do_an', password: 'do_an', connectionLimit: 5 });

/* GET home page. */
router.get('/', async function (req, res, next) {
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`SELECT store_status.id as id, store_status.block_id as block_id, product_list.name as name, store_status.checked_time as checked_time FROM store_status JOIN product_list WHERE store_status.product_id = product_list.product_id`);
    await conn.query(`UPDATE store_status SET checked_time = CURRENT_TIMESTAMP WHERE 1`);
    
    res.status(200).json(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

module.exports = router;
