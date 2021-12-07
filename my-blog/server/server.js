//express 모듈 불러와 app에 담아서 서버를 관리함
const express = require('express');
const app = express();

//포트 할당
const PORT = process.env.PORT || 4000;

// 서버 실행했을 때, 서버 응답 출력
//'/api/host'로 보내는 모든 요청은 'seoyeon'이라는 값으로 응답받음
app.get('/api/host', (req, res) => {
  res.send({host: 'seoyeon'});
})

// express를 담은 app에 listen 메서드를 사용해서 서버를 읽어오고 포트를 할당한다.
// server.js파일이 있는 디렉토리 경로에서 node server.js 명령어 사용
app.listen(PORT, () => {
  console.log(`Server on: http://localhost:${PORT}/`);
})
