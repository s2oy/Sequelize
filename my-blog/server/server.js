//express 모듈 불러와 app에 담아서 서버를 관리함
const express = require('express');
const app = express();

//sequelize 연결
const sequelize = require('./models').sequelize;
//body-parser 모듈 적용
const bodyParser = require('body-parser')

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const {
  Teacher,
  Sequelize: { Op }
} = require('./models');
sequelize.query('SET NAMES utf8');

// client가 '/app/data'의 주소로 보내는 모든 데이터는 server로 전송됨
app.post('/app/data', (req,res) => {
  console.log(req.body)
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

