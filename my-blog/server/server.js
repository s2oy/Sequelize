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

//.findAll() 메서드는 해당 테이블의 모든 데이터를 조회하는 메서드: select from * teachers
app.get('/get/data', (req, res) => {
  Teacher.findAll({
    // Number가 1번인 데이터와 Alan이란 이름의 데이터를 조회함
    // 여러개의 데이터를 가져오기 위해선 [Op.or]을 사용한다. (or 연산자) !반드시 2개이상의 밸류를 조건으로 지정
    where: {[Op.or]: [{id:1},{name: 'Alan'}]}
  })
  .then( result => { res.send(result) })
  .catch( err => { throw err })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

