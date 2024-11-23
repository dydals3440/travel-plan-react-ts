import { PlanState } from '@/store';
import { parseTime, timeToString, transformTimeToMinutes } from '@/utils/time';
import { ItineraryItem } from '../../../../server/types';

export default function useGenerateItinerary() {
  return {
    generateItinerary,
  };
}

function getMatrix(
  locations: { lat: number; lng: number }[]
): Promise<google.maps.DistanceMatrixResponse> {
  const distanceMatrixService = new google.maps.DistanceMatrixService();

  return new Promise((resolve, reject) => {
    const request: google.maps.DistanceMatrixRequest = {
      origins: locations,
      destinations: locations,
      // 대중교통을 통한, 여행 일정을 생성
      travelMode: google.maps.TravelMode.TRANSIT,
    };
    distanceMatrixService.getDistanceMatrix(request, (response, status) => {
      if (status === google.maps.DistanceMatrixStatus.OK) {
        resolve(response!);
      } else {
        reject(status);
      }
    });
  });
}

// zustand로 저장한 plannedPlaces에 대한 state값
async function generateItinerary(
  places: PlanState['plannedPlaces'],
  dailyTimes: PlanState['dailyTimes']
) {
  const locations = places.map(({ place }) => place.coordinates);
  const matrix = await getMatrix(locations);
  const route = findOptimalRoute(matrix);
  // const times = dailyTimes.map(({ startTime, endTime }) => {
  //   const start = transformTimeToMinutes(startTime);
  //   const end = transformTimeToMinutes(endTime);
  //   return end - start;
  // });
  const itinerary = groupPlacesByDay({ route, places, matrix }, dailyTimes);

  // 날짜별로 분리
  return itinerary;
}

// 최적의 경로를 찾음
function findOptimalRoute(matrix: google.maps.DistanceMatrixResponse) {
  // 먼저 기준이 되는 Route를, 첫번째 장소로하고, 그 첫번쨰 장소로부터 제일 가까운 장소를 찾고, 계속 반복적으로 진행하면서, 마지막으로 추가된 장소에 대해서, 가장 가까운 장소를 연결하는 과정을 진행.
  // 중복된 라우트 없애기 위해 set이라는 데이터 구조를 사용해서 이미 방문된 장소인 경우에는, set에 저장을하고, 방문된 저장을 제외한 나머지 장소들 중에서, 가장 가까운 경로들을 연결해주는 작업을 진행하고자 함.
  // 1. 경로등록 여부 판단. (경로의 총 개수)
  const length = matrix.rows.length;
  const visited = new Set<number>();
  // 기준이 되는 경로
  const route = [0];
  visited.add(0);

  while (visited.size < length) {
    let min = Infinity;
    // 인덱스 지정하지 않았다. -1
    let next = -1;
    const current = route[route.length - 1];

    for (let i = 0; i < length; i++) {
      if (visited.has(i)) {
        // 더이상 중복되지 않도록, continue
        continue;
      }

      const distance = matrix.rows[current].elements[i].distance.value;
      if (distance < min) {
        min = distance;
        next = i;
      }
    }

    if (next !== -1) {
      route.push(next);
      visited.add(next);
    }
  }

  return route;
}

const THRESHOLD = 10_000;
function groupPlacesByDay(
  {
    route,
    places,
    matrix,
  }: {
    route: number[];
    places: PlanState['plannedPlaces'];
    matrix: google.maps.DistanceMatrixResponse;
  },
  dailyTimes: PlanState['dailyTimes']
) {
  // 각 Daily마다, 몇시간의 시간이있는지 계산
  const itinerary: ItineraryItem[][] = [];
  let dailyDuration = 0;
  let dailyTime = getDailyTimes(dailyTimes[0]);

  route.forEach((placeIndex, index) => {
    // 처음 경로가 추가되는 경우
    if (itinerary.length === 0) {
      const endTime =
        transformTimeToMinutes(dailyTimes[0].startTime) +
        places[placeIndex].duration;
      itinerary.push([
        {
          ...places[placeIndex],
          startTime: dailyTimes[0].startTime,
          endTime: timeToString(parseTime(endTime)),
          duration: places[placeIndex].duration,
        },
      ]);
      dailyDuration = places[placeIndex].duration;
      return;
    }

    const day = itinerary[itinerary.length - 1];
    const lastPlaceIndex = route[index - 1];
    // 직전에 등록된 장소부터, 지금 현재 계산되는, 장소까지의 거리를 가져올 수 있음.
    const distance =
      matrix.rows[lastPlaceIndex].elements[placeIndex].distance.value;
    const duration =
      matrix.rows[lastPlaceIndex].elements[placeIndex].duration.value / 60; // in minutes
    dailyDuration += duration;

    // 이 경로가 가깝다는 것을 판단하기 위해서, 여행 일정을 짜는데, 제주에 동쪽부터, 제주의 서쪽까지 하루 일정으로 짜면 비효율 적, 이러한 부분들의 임계치를 지정, (threshold 기본적으로 10Km)

    // 임계치 거리 이상.
    if (distance > THRESHOLD || dailyDuration > dailyTime) {
      dailyTime = getDailyTimes(dailyTimes[itinerary.length]);
      const endTime =
        transformTimeToMinutes(dailyTimes[0].startTime) +
        places[placeIndex].duration;

      const { hours, minutes } = parseTime(endTime);

      itinerary.push([
        {
          ...places[placeIndex],
          startTime: dailyTimes[0].startTime,
          endTime: `${hours}:${minutes}`,
        },
      ]);

      dailyDuration = places[placeIndex].duration;
    } else {
      const startTime = transformTimeToMinutes(
        dailyTimes[itinerary.length - 1].startTime + dailyDuration
      );

      const endTime = startTime + places[placeIndex].duration;

      day.push({
        ...places[placeIndex],
        startTime: timeToString(parseTime(startTime)),
        endTime: timeToString(parseTime(endTime)),
      });

      dailyDuration += places[placeIndex].duration;
    }
  });

  while (itinerary.length < dailyTimes.length) {
    const max = itinerary.reduce((acc, day, index) => {
      if (day.length > itinerary[acc].length) {
        return index;
      }
      return acc;
    }, 0);

    // 반복을 더 이상 하지 않도록, 만약 모든 날짜에 하나씩 밖에 없다면, 반복 하면 안되기에 아래 처리.
    if (itinerary[max].length === 1) {
      break;
    }

    const day = itinerary[max];
    const half = Math.floor(day.length / 2);
    itinerary[max] = day.slice(0, half);
    itinerary.push(day.slice(half));
  }

  return itinerary;
}

function getDailyTimes({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) {
  const start = transformTimeToMinutes(startTime);
  const end = transformTimeToMinutes(endTime);
  return end - start;
}
