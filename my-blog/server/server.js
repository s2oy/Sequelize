//express 모듈 불러와 app에 담아서 서버를 관리함
const express = require('express');
const app = express();

//sequelize 연결
const sequelize = require('./models').sequelize;
//body-parser 모듈 적용
const bodyParser = require('body-parser')

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Teacher table을 서버로 가져와 읽을 수 있게 함
const {
    Teacher,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

// client가 '/add/data'의 주소로 보내는 모든 데이터는 server로 전송됨
// create method로 data를 추가할 수 있음
app.post('/add/data', (req,res) => {
  console.log(req.body)

    Teacher.create({
      //teacher table의 name column에 client로 넘어온 req.body.data값을 추가함
      name: req.body.data
    })
    .then( result => {
      res.send(result)
    })
    .catch( err => {
      console.log(err)
      throw err;
    })
})

// server에서 데이터를 client로 전송할 때의 형태
// findAll: Array
// findOne: Object
app.get('/get/data', (req, res) => {
  Teacher.findOne({
    // findOne과 where을 사용하여 하나의 데이터만 가져올 수 있음
    // findOne은 반드시 where과 함께 사용해야한다.
    where: { id: 2 }
  })
  .then( result => { res.send(result) })
  .catch( err => { throw err })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

