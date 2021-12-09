module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		//테이블 이름 지정
		'teacher',
		{
			name: {	//columns명
				type: DataTypes.STRING(50), //string type === varchar
				allowNull: true
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
			timestamps: false,
		}
	)};
