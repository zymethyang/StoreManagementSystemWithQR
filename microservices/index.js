var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: './cert/private.pem.key',
    certPath: './cert/certificate.pem.crt',
    caPath: './cert/rootCA.pem',
    clientId: 'allow_all',
    host: 'a162573iz22qwr-ats.iot.ap-southeast-1.amazonaws.com'
});

const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: '52.220.252.63', database: 'store', user: 'do_an', password: 'do_an', connectionLimit: 5 });

let conn;

try {
    (async () => {
        conn = await pool.getConnection();
        device
            .on('connect', function () {
                console.log('connected');
                device.subscribe('storage/client/control');
            });

        device
            .on('message', async function (topic, payload) {
                const msgBuffer = payload.toString();
                const msg = JSON.parse(msgBuffer);
                const { act_id } = msg;
                const rows = await conn.query(`SELECT * FROM position_table WHERE act_id = ?`, [act_id]);

                const positionList = JSON.parse(rows[0].position_list);

                for (let index = 0; index < positionList.length; index++) {
                    setTimeout(() => {
                        device.publish('storage/control', JSON.stringify(positionList[index]))
                    }, 4000 * index);
                }
            });
    })()
} catch (err) {
    throw err;
} finally {
    if (conn) conn.release(); //release to pool
}
