import { Router } from 'express';
// mongodb와 유사, SQL로 동작, 매우 쉬움
import DataStore from 'nedb';
import { City } from '../types';

// 파일 기반으로 동작
const db = new DataStore({ filename: 'data/cities.db', autoload: true });

// Router Instance 생성
const cityRouter = Router();

cityRouter.get('/', (req, res) => {
  // 빈 Object 전체 파일 반환
  db.find({}, (err: Error | null, docs: City[]) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(docs);
    }
  });
});

cityRouter.get('/:city', (req, res) => {
  // 빈 Object 전체 파일 반환
  db.find({ city: req.params.city }, (err: Error | null, doc: City[]) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(doc);
    }
  });
});

cityRouter.post('/', (req, res) => {
  const city = req.body as City;
  db.insert(city, (err: Error | null, doc: City) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(doc);
    }
  });
});

export default cityRouter;
