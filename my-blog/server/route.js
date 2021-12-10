//라우터는 클라이언트가 서버로 요청할 수 있는 API 주소를 나타냄
const express = require('express');
const router = express.Router(); //router 변수를 통해 API주소 연결
const controller = require('./controller');	//controller 연결

//client는 /get/data를 통해 controller의 api.getData에 접근가능
router.get('/get/data', controller.api.getData);

//app.get => router.get
router.get('/get/data');

router.post('/add/data');
router.post('/modify/data');
router.post('/delete/data');

//모듈화해서 외부에서 접근할 수 있게 함
module.exports = router;
