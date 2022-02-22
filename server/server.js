const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const options = {
      swaggerDefinition: {
        info: {
          title: 'NEHA Application',
          info: '1.0.0',
          description: 'Application to perform CRUD operation with Database',
        },
        host: '159.89.52.132:3000',
        basePath: '/',
      },
      apis: ['./server.js'],
};

const specs = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sample',
    port: 3306,
    connectionLimit: 5
});

app.get('/app', (req, res) => {
    res.header('Content-type', 'text/html');
    return res.send('Hello Neha');
});

/**
* @swagger
* /agents:
*    get:
*      description: Return all agents
*      produces:
*          - application/json
*      responses:
*          200:
*              description: Contains array of agents
*/
app.get('/agents', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var query = 'SELECT * FROM agents';
        var rows = await conn.query(query);
        res.send(JSON.stringify(rows));
        res.header('Content-Type', 'application/json');
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.release();
    }
});

/**
* @swagger
* /agents/{agentCode}:
*   get:
*     description: Retrieve a single agent.
*     parameters:
*       - in: path
*         name: agentCode
*         required: true
*         description: string agent code.
*         schema:
*           type: string
*     responses:
*       200:
*         description: Contains agent data
*/
app.get('/agents/:agentCode', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var query = 'SELECT * FROM agents where AGENT_CODE=?';
        var rows = await conn.query(query, [req.params.agentCode]);
        res.send(JSON.stringify(rows));
        res.header('Content-Type', 'application/json');
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.release();
    }
});

/**
* @swagger
* /customer:
*    get:
*      description: Return all customer
*      produces:
*          - application/json
*      responses:
*          200:
*              description: Contains array of customer
*/
app.get('/customer', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var query = 'SELECT * FROM customer';
        var rows = await conn.query(query);
        res.send(JSON.stringify(rows));
        res.header('Content-Type', 'application/json');
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.release();
    }
});

app.get('/customer/:custCode', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var query = 'SELECT * FROM customer where CUST_CODE=?';
        var rows = await conn.query(query, [req.params.custCode]);
        res.send(JSON.stringify(rows));
        res.header('Content-Type', 'application/json');
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.release();
    }
});

app.get('/company', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var query = 'SELECT * FROM company';
        var rows = await conn.query(query);
        res.send(JSON.stringify(rows));
        res.header('Content-Type', 'application/json');
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.release();
    }
});


/**
* @swagger
* /agents:
*   post:
*     description: Retrieve a single customer.
*     parameters:
*       - in: body
*         type: object
*         properties:
*           CUST_CODE:
*               type: string
*           CUST_NAME:
*               type: string
*           CUST_CITY:
*               type: string
*           WORKING_AREA:
*               type: string
*           CUST_COUNTRY:
*               type: string
*           OPENING_AMT:
*               type: string
*           RECEIVE_AMT:
*               type: string
*           PAYMENT_AMT:
*               type: string
*           OUTSTANDING_AMT:
*               type: string
*           PHONE_NO:
*               type: string
*           AGENT_CODE:
*               type: string
*     responses:
*       200:
*         description: Contains customer  data
*/
app.post('/customers',
 async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var CUST_CODE = req.body.CUST_CODE;
        var CUST_NAME = req.body.CUST_NAME;
        var CUST_CITY = req.body.CUST_CITY;
        var WORKING_AREA = req.body.WORKING_AREA;
        var CUST_COUNTRY = req.body.CUST_COUNTRY;
        var OPENING_AMT = req.body.OPENING_AMT;
        var query = `INSERT INTO customer values ('${CUST_CODE}','${CUST_NAME}','${CUST_CITY}','${WORKING_AREA}','${CUST_COUNTRY}','${OPENING_AMT}','${RECEIVE_AMT}','${PAYMENT_AMT}','${OUTSTANDING_AMT}','${PHONE_NO}'),'${AGENT_CODE}')`;
        var rows = await conn.query(query);
        res.end(JSON.stringify(rows));
        res.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200);
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.release();
    }});

/**
* @swagger
* /agents:
*   put:
*     description: Retrieve a single customer.
*     parameters:
*       - in: body
*         type: object
*         properties:
*           CUST_CODE:
*               type: string
*           CUST_NAME:
*               type: string
*           CUST_CITY:
*               type: string
*           WORKING_AREA:
*               type: string
*           CUST_COUNTRY:
*               type: string
*           OPENING_AMT:
*               type: string
*           RECEIVE_AMT:
*               type: string
*           PAYMENT_AMT:
*               type: string
*           OUTSTANDING_AMT:
*               type: string
*           PHONE_NO:
*               type: string
*           AGENT_CODE:
*               type: string
*     responses:
*       200:
*         description: Contains customer data
*/
app.put('/customer'),
 async (req, res) => {
    let conn;
    try {
        var CUST_CODE = req.body.CUST_CODE;
        var CUST_NAME = req.body.CUST_NAME;
        var CUST_CITY = req.body.CUST_CITY;
        var WORKING_AREA = req.body.WORKING_AREA;
        var CUST_COUNTRY = req.body.CUST_COUNTRY;
        var OPENING_AMT = req.body.OPENING_AMT;
        var RECEIVE_AMT = req.body.RECEIVE_AMT;
        var PAYMENT_AMT = req.body.PAYMENT_AMT;
        var OUTSTANDING_AMT = req.body.PAYMENT_AMT;
        var PHONE_NO = req.body.PHONE_NO;
        var AGENT_CODE = req.body.AGENT_CODE;
        conn = await pool.getConnection();
        var query = `UPDATE customer SET CUST_NAME='${CUST_NAME}',CUST_CITY='${CUST_CITY},'WORKING_AREA='${WORKING_AREA}',CUST_COUNTRY='${CUST_COUNTRY},OPENING_AMT='${OPENING_AMT} ,RECEIVE_AMT='${RECEIVE_AMT},PAYMENT_AMT='${PAYMENT_AMT},OUTSTANDING_AMT='${OUTSTANDING_AMT},PHONE_NO='${PHONE_NO}',AGENT_CODE='${AGENT_CODE}' where CUST_CODE='${CUST_CODE}'`;
        var rows = await conn.query(query,CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY,OPENING_AMT,RECEIVE_AMT,PAYMENT_AMT,OUTSTANDING_AMT,PHONE_NO,AGENT_CODE, CUSTOMER_CODE);
        res.end(JSON.stringify(rows));
        res.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200);
    } catch (err) {
        res.status(404).json({ err });
    } finally {
if (conn) return conn.release();
    }
};
app.delete('/customer/:CUST_CODE', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var CUST_CODE = req.params.CUST_CODE;
        var query = `DELETE FROM customer WHERE CUST_CODE='${CUST_CODE}'`;
        const result = await conn.query(query, CUST_CODE);
        console.log('query executed');
        if(result.affectedRows) {

        console.log(`${result.affectedRows} Records deleted successfully`);
        res.end(`${result.affectedRows} Records deleted successfully`);
        }
        res.end('No matching records to delete');
    } catch (err) {
        res.status(404).json({err});
   }
     finally {
       if (conn) return conn.release();
     }
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

/**
* @swagger
* /agents:
*   patch:
*     description: Retrieve a single customer.
*     parameters:
*       - in: body
*         type: object
*         properties:
*           CUST_CODE:
*               type: string
*           CUST_NAME:
*               type: string
*           CUST_CITY:
*               type: string
*           WORKING_AREA:
*               type: string
*           CUST_COUNTRY:
*               type: string
*           OPENING_AMT:
*               type: string
*           RECEIVE_AMT:
*               type: string
*           PAYMENT_AMT:
*               type: string
*           OUTSTANDING_AMT:
*               type: string
*           PHONE_NO:
*               type: string
*           AGENT_CODE:
*               type: string
*     responses:
*       200:
*         description: Contains customer data
*/
  app.patch('/agents',[
  ], async (req, res) => {
      let conn;
      try {
          var agentCode = req.body.agentCode;
          var agentName = req.body.agentName;
          var workingArea = req.body.workingArea;
          var commission = req.body.commission;
          var phoneNo = req.body.phoneNo;
          var country = req.body.country;
          conn = await pool.getConnection();
          var query = `UPDATE agents SET AGENT_NAME='${agentName}', WORKING_AREA='${workingArea}', COMMISSION='${commission}',PHONE_NO='${phoneNo}',COUNTRY='${country}' where AGENT_CODE='${agentCode}'`;
          var rows = await conn.query(query, agentName, workingArea, commission, phoneNo, country, agentCode);
          res.end(JSON.stringify(rows));
          res.header('Content-Type', 'application/json');
          res.header('Access-Control-Allow-Origin', '*');
          res.status(200);
      } catch (err) {
          res.status(404).json({ err });
      } finally {
          if (conn) return conn.release();
      }
  });
/**
* @swagger
* /customer/{CUST_CODE}:
*   delete:
*     description: Deletes a single agent.
*     parameters:
*       - in: path
*         name: CUST_CODE
*         required: true
*         description: string CUST_CODE.
*         schema:
*           type: string
*     responses:
*       200:
*         description: deletes customer data
*/
app.delete('/customer/:CUST_CODE', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var CUST_CODE = req.params.agentCode;
        var query = `DELETE FROM customer WHERE CUST_CODE='${CUST_CODE}'`;
        const result = await conn.query(query, CUST_CODE);
        console.log('query executed');
        if(result.affectedRows) {

        console.log(`${result.affectedRows} Records deleted successfully`);
        res.end(`${result.affectedRows} Records deleted successfully`);
        }
        res.end('No matching records to delete');
    } catch (err) {
        res.status(404).json({err});
   }
     finally {
       if (conn) return conn.release();
     }
});
