import { Request, Response, Router } from 'express';
import { City, Country } from '../types';
import { citiesDB, countriesDB } from '../db';

// Router Instance 생성
const cityRouter = Router();

cityRouter.get('/', (req: Request, res: Response) => {
  // 빈 Object 전체 파일 반환
  citiesDB.find({}, (err: Error | null, cities: City[]) => {
    if (err) {
      res.status(500).send(err);
    } else {
      countriesDB.find({}, (err: Error | null, countries: Country[]) => {
        if (err) {
          return res.status(500).send(err);
        } else if (countries.length === 0) {
          return res.status(404).send('Country Not Found');
        } else {
          const newCities = cities.map((city) => {
            const country = countries.find(
              (country) => country.code === city.country
            );
            return { ...city, country };
          });
          return res.send(newCities);
        }
      });
    }
  });
});

// 도시 검색
cityRouter.get('/search', (req: Request, res: Response) => {
  const { q } = req.query;

  if (typeof q !== 'string') {
    return res.status(400).send('Invalid Query');
  }

  const queryRegex = new RegExp(q, 'i');

  countriesDB.find({}, (err: Error | null, countries: Country[]) => {
    if (err) {
      return res.status(500).send(err);
    }

    const searchCountries = countries.filter((country) =>
      country.name.match(queryRegex)
    );

    const countriesReges = new RegExp(
      searchCountries.map((country) => country.code).join('|'),
      'i'
    );

    console.log(searchCountries);

    const dbQuery =
      searchCountries.length > 0
        ? {
            $or: [{ name: new RegExp(q, 'i') }, { country: countriesReges }],
          }
        : {
            name: new RegExp(q, 'i'),
          };

    citiesDB.find(dbQuery, (err: Error | null, cities: City[]) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        const newCities = cities.map((city) => {
          const country = countries.find(
            (country) => country.code === city.country
          );
          return { ...city, country };
        });
        return res.send(newCities);
      }
    });
  });
});

cityRouter.get('/:city', (req, res) => {
  citiesDB.findOne(
    { code: req.params.city },
    (err: Error | null, city: City) => {
      if (err) {
        res.status(500).send(err);
      } else if (!city) {
        res.status(404).send('City not found');
      } else {
        countriesDB.findOne({ code: city.country }, (err, country) => {
          if (err) {
            res.status(500).send(err);
          } else if (!country) {
            res.status(404).send('Country not found');
          } else {
            res.send({ ...city, country });
          }
        });
      }
    }
  );
});

cityRouter.post('/', (req, res) => {
  const city = req.body as City;
  citiesDB.insert(city, (err: Error | null, doc: City) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(doc);
    }
  });
});

export default cityRouter;
