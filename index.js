const express = require("express");
const bodyParser = require("body-parser")
const path = require("path")
const fetchFBLeadsService = require("./service");
const service = new fetchFBLeadsService();

const app = new express();
// console.log('file path',`${root}/public`)
app.use(bodyParser.json({
    limit:'100kb'
}));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: config.REQUEST_LIMIT || '100kb',
    })
);
app.use(function (req, resp, next) {
    resp.header('Access-Control-Allow-Origin', "*");
    resp.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    resp.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with,beartoken,authtoken');
    next();
});

app.post('/', (req, res) => {
    let resdata = service.fetchFBLeads(req.body)
    let newarr = [];
      if (resdata) {
        resdata.field_data.map((data) => {
          let getname = data.name;
          let getvalues = data.values[0];
          newarr.push({ [getname]: getvalues });
        });
        newarr.push({
          leadgen_id: req.body.entry[0].changes[0].value.leadgen_id,
        });
      }
    res.json(newarr)
});
app.get('/', (req, res) => {
    res.json("Working !!")
})
  

app.listen(8000, () => {
    console.log('Server Running on port', 8000)
})
