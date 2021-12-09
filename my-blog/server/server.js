//express 모듈 불러와 app에 담아서 서버를 관리함
const express = require('express');
const app = express();

//sequelize 연결
const sequelize = require('./models').sequelize;
sequelize.sync();

app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

