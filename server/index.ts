import express from 'express';
import apiRouter from './api';

const server = await (async () => {
  const app = express();
  const port = 3000;

  // body에 json데이터 파싱할 수 있도록 express.json
  app.use(express.json());
  app.use('/api', apiRouter);
  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  return app.listen(port, () => {
    console.log(`서버 실행 at http://localhost:${port}`);
  });
})();

// 이제 vite node를 사용해서 Hot reload가 동작할 떄 이전에 실행된 서버를 닫아주는 부분 구현
(() => {
  if (import.meta.hot) {
    import.meta.hot.accept(async () => {
      await server.close();
    });
  }
})();
