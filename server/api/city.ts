import { Request, Response, Router } from 'express';
import { City, Country, Place } from '../types';
import { citiesDB, countriesDB, placesDB } from '../db';

// Router Instance 생성
const cityRouter = Router();

cityRouter.get('/', (req: Request, res: Response) => {
  const { filter } = req.query;

  const query = filter
    ? filter === 'domestic'
      ? { country: 'kr' }
      : { country: { $ne: 'kr' } }
    : {};

  // 빈 Object 전체 파일 반환
  citiesDB.find(query, (err: Error | null, cities: City[]) => {
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
  const { q, filter } = req.query;

  if (typeof q !== 'string') {
    return res.status(400).send('Invalid Query');
  }

  const queryRegex = new RegExp(q, 'i');

  const query = filter
    ? filter === 'domestic'
      ? { country: 'kr' }
      : { country: { $ne: 'kr' } }
    : {};

  countriesDB.find(query, (err: Error | null, countries: Country[]) => {
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

//
cityRouter.post('/:city/places', (req, res) => {
  // 장소에 정보는 바디에 있음.
  const place = req.body;
  const city = req.params.city;

  placesDB.insert({ ...place, city }, (err: Error | null, place: Place) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(place);
    }
  });
});

cityRouter.get('/:city/places', (req, res) => {
  const city = req.params.city;
  const category = req.query.category as
    | Place['category']
    | Place['category'][]
    | undefined;
  const q = req.query.q as string;

  const query = {
    city,
    ...(category
      ? {
          category: {
            $in: Array.isArray(category) ? category : [category],
          },
        }
      : {}),
    ...(q ? { name: new RegExp(q, 'i') } : {}),
  };

  // 필터도되고 검색도 되는 API로 변경, 위의 query를 받았기에
  placesDB.find(query, (error: Error | null, places: Place[]) => {
    if (error) {
      // 서버에러가 날 가능성이 있기에 500
      res.status(500).send(error);
    } else {
      res.send(places);
    }
  });
});

export default cityRouter;
