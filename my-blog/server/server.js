//express 모듈 불러와 app에 담아서 서버를 관리함
const express = require('express');
const app = express();
//route.js에 접근
const router = require('./route'); 

//sequelize 연결
const sequelize = require('./models').sequelize;
//body-parser 모듈 적용
const bodyParser = require('body-parser')

sequelize.sync();
// sequelize.sync({ force: true }); // 모든 테이블의 데이터 초기화

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', router);

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

// findAll로 데이터 조회
app.get('/get/data', (req, res) => {
  Teacher.findAll()
  .then( result => { res.send(result) })
  .catch( err => { throw err })
})

//update 메서드는 데이터를 변경해줌
app.post('/modify/data', (req,res) => {
  Teacher.update({ name: req.body.modify.name}, {
    where: {id: req.body.modify.id}
  })
  .then ( result => { res.send(result) })
  .catch( err => {throw err })
})

//destory 메서드로 데이터 삭제 (어떤 대상을 삭제할지 where에서 인자값전달)
app.post('/delete/data', (req, res) => {
  Teacher.destroy({
      where : { id: req.body.delete.id }
  })
  .then( res.sendStatus(200) )
  .catch( err => { throw err })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

