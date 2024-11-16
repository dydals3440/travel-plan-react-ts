import { usePlanStore } from '@/store';
import UpArrowIcon from '@/assets/icons/up-arrow.svg?react';
import { useState } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';
import Button from '../common/Button';
import { getTotalTime, parseTime, printTime } from '@/utils/time';

export default function DailyTimeController({
  onCompleted,
}: {
  onCompleted: () => void;
}) {
  const [hidden, setHidden] = useState(false);
  const { dailyTimes, setDailyTime } = usePlanStore();
  // useMemo를 통해, 계산 로직을 성능 좋게 만들려고 함.

  const totalTime = getTotalTime(dailyTimes);

  return (
    <div className='text-left flex flex-col gap-y-18 w-[368px]'>
      <p className='text-17 font-medium tracking-[0.17px]'>
        <div className='flex items-center'>
          <span className='mr-16'>여행시간 상세설명</span>
          <span className='text-[#5A88FF]'>
            총 {printTime(parseTime(totalTime))}
          </span>
          <button onClick={() => setHidden((prev) => !prev)}>
            <UpArrowIcon className={cn({ 'rotate-180': !hidden })} />
          </button>
        </div>
      </p>
      {!hidden && (
        <>
          <div>
            {/* letter-spacing : tracking */}
            <p className='text-15 leading-[1.7] -tracking-[0.09]'>
              입력하신 여행 기간이 시차를 고려한 현지 여행 기간이 맞는지 확인해
              주시고 각 날짜의 일정 시작시간과 종료시간을 현지 시간 기준으로
              설정해주세요. 기본 설정 시간은 오전 10시~오후 10시 총
              12시간입니다.
            </p>
          </div>
          <div>
            <table className='text-15 text-center mb-36'>
              <thead>
                <tr className='bg-bg'>
                  <th className='py-10 px-20'>일자</th>
                  <th className='py-10 px-20'>요일</th>
                  <th className='py-10 px-32'>시작시간</th>
                  <th className='py-10 px-32'>종료시간</th>
                </tr>
              </thead>
              <tbody className="before:contents-[''] before:block before:h-6">
                {dailyTimes.map((dailyTime, index) => (
                  <tr key={index}>
                    <td className='py-10'>{format(dailyTime.date, 'M/dd')}</td>
                    <td className='py-10'>{format(dailyTime.date, 'EEE')}</td>
                    <td className='py-10'>
                      <input
                        type='time'
                        value={dailyTime.startTime}
                        onChange={(e) =>
                          setDailyTime(
                            index,
                            e.currentTarget.value,
                            'startTime'
                          )
                        }
                      />
                      {/* {format(
                  // 오전으로 파싱하는 방법
                  parse(dailyTime.startTime, 'HH:mm', new Date()),
                  'a h:mm'
                )} */}
                    </td>
                    <td className='py-10'>
                      <input
                        type='time'
                        value={dailyTime.endTime}
                        onChange={(e) =>
                          setDailyTime(index, e.currentTarget.value, 'endTime')
                        }
                      />

                      {/* {format(
                  // 오전으로 파싱하는 방법
                  parse(dailyTime.endTime, 'HH:mm', new Date()),
                  'a h:mm'
                )} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* div 추가해서 인라인 동작하게 */}
            <div>
              <Button onClick={onCompleted} className='px-47'>
                시간 설정 완료
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
