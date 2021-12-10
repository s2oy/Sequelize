//실질적으로 데이터를 주고 받을 수 있는 controller
const path = require('path');

const AWS = require('aws-sdk');
AWS.config.loadFromPath(
	path.join(__dirname, 'config', 'awsConfig.json')
);

// 모듈화(객체형태)하고 외부에서 접근할 수  있게 한다.
// 모델에 접근할 수  있는 경로를 키와 밸류로 설정 가능함
module.exports = {
	need: () => load,
	api: {
		getData: (req, res) => {
			console.log('컨트롤러 연결 성공!')
		} ,
		getData: (req, res) => {
		
		},
		modifyData: (req, res) => {
		
		},
		deleteData: (req, res) => {
		
		},
	}
}