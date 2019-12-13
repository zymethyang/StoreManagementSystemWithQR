const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: '52.220.252.63', database: 'store', user: 'do_an', password: 'do_an', connectionLimit: 5 });

async function asyncFunction() {
    let conn;
    try {

        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM `position_table`");
        // rows: [ {val: 1}, meta: ... ]
        console.log(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

asyncFunction();