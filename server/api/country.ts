import { Router } from 'express';
import { Country } from '../types';
import { countriesDB } from '../db';

// Router Instance 생성
const countryRouter = Router();

countryRouter.get('/', (req, res) => {
  // 빈 Object 전체 파일 반환
  countriesDB.find({}, (err: Error | null, docs: Country[]) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(docs);
    }
  });
});

countryRouter.post('/', (req, res) => {
  const country = req.body as Country;
  countriesDB.insert(country, (err: Error | null, doc: Country) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(doc);
    }
  });
});

export default countryRouter;
