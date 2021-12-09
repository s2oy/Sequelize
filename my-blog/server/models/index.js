//Sequelize를 사용하여 데이터베이스 관리
//Table의 역할을 파일들을 관리하고 연결해줌
'use strict';

const path = require('path');
const Sequelize = require('sequelize');

// path 인자값 중 '..'은 경로의 이동값으로, 이전 디렉토리에 있음을 의미
// 'config'는 현재 디렉토리 안에 있는 'config' 디렉토리로 들어감
// 'db.json'은 'config'디렉토리 안의 'db.json'파일을 가져오겠단 의미
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[
	env
];
const db = {};

// config 변수를 사용해 Sequelize에 RDS 정보할당
// 연동 성공시, "Connectoin has been established successfully." 출력
// 연동 실패시, "Unable to connect to the database: "출력

let sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config,
	{
	  define: {
	    charset: 'utf8',
	    collate: 'utf8_general_ci'
	  }
	}
      );
      
	db.sequelize = sequelize;
	db.Sequelize = Sequelize;
    
	db.sequelize
	.authenticate()
	.then(() => {
	    console.log('Connection has been established successfully.');
	})
	.catch(err => {
	    console.log('Unable to connect to the database: ', err);
	});

	//DB정보를 담은 db 오브젝트에 teacher의 이름으로 키값넣고 밸류 값 담기
	db.Teacher = require('./teacher')(sequelize, Sequelize);
	db.Class = require('./class')(sequelize, Sequelize);

	/*
	// 1:1관계 (Teacher:Class) 지정 메서드
	// Teacher은 foreignkey를 제공하는 source모델이 됨
	// Class는 source를 제공받는 target모델이 됨
	db.Teacher.hasOne(db.Class)
	*/

	/*
	// 1:n관계 (Teacher:Classes) 지정 메서드
	// 두개의 테이블이 두개의 foreignkey로 이루어진 관계
	// 'hasMany'는 1:n 방식을 지정함
	// Teacher 테이블의 id 값을 theacher_id라는 이름을 가진 foreignKey로 전달
	db.Teacher.hasMany(db.Class, {
		foreignKey: 'teacher_id',
		sourceKey: 'id'
	});
	// 'BelongsTo'는 source모델에 target모델의 foreignKey를 전달함
	// 일방항셩이 아닌 양방향의 관계를 나타내는 메소드임
	db.Class.belongsTo(db.Teacher, {
		foreignKey: 'teacher_id',
		targetKey: 'id'
	});
	*/

	// n:m관계 (Teachers:Classes) 지정 메서드
	// 두개의 테이블이 여러개의 foreignKey
	// n:m관계 지정 시 through로 새로운 테이블 생성 => 두개의 테이블의 foreignKey로 이루어진 두개의 Column 생성
	db.Teacher.belongToMany(db.Class, {
		through: 'schedule',
		foreignKey: 'teacher_id'
	});
	db.Class.belongToMany(db.Teacher, {
		through: 'schedule',
		foreignKey: 'class_id',
	});




    
    db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
    module.exports = db;

