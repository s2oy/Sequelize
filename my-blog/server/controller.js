//실질적으로 데이터를 주고 받을 수 있는 controller
const path = require('path');

const AWS = require('aws-sdk');
AWS.config.loadFromPath(
	path.join(__dirname, 'config', 'awsConfig.json')
);