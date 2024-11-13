import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './TravelDateSelector.css';

import { ko } from 'date-fns/locale';

export default function TravelDateSelector() {
  // monthsShown 몇개를 보여줄지, 달력을
  // selectsRange: true -> onChange 이벤트에, startDate와 endDate를 받을 수 있음.
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChange = ([start, end]: [Date | null, Date | null]) => {
    // 시작과 끝 핸들러 연결 (Range 선택이 가능해짐)
    setStartDate(start);
    setEndDate(end);
  };

  // 최소 날짜 (오늘 날짜)
  const today = new Date();

  // 여행 일자는 최대 10일까지 선택 가능.

  return (
    <DatePicker
      inline
      monthsShown={2}
      selectsRange
      startDate={startDate ?? undefined}
      endDate={endDate ?? undefined}
      // 위에서 만든 핸들러를 연결
      onChange={handleChange}
      // 최소 날짜 (오늘 이전의 날짜는 disabled)
      minDate={today}
      // 여행 일자는 최대 10일까지
      maxDate={
        startDate != null && endDate == null
          ? new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + 10
            )
          : undefined
      }
      // date-fns 활용 언어 설정
      locale={ko}
      // 월-년 -> 년-월
      dateFormatCalendar='yyyy년 M월'
      // custom-header-with-two-months-displayed
      renderCustomHeader={({
        // 현재 선택된 month
        monthDate,
        // customHeader가 몇번쨰 카운트
        customHeaderCount,
        // 이전 달
        decreaseMonth,
        // 다음 달
        increaseMonth,
      }) => (
        <div className='mb-14 flex justify-center'>
          <button
            aria-label='Previous Month'
            className={
              'react-datepicker__navigation react-datepicker__navigation--previous'
            }
            style={
              customHeaderCount === 1 ? { visibility: 'hidden' } : undefined
            }
            onClick={decreaseMonth}
          >
            <span
              className={
                'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
              }
            >
              {'<'}
            </span>
          </button>
          {/* 연 월 표시 */}
          <span className='react-datepicker__current-month'>
            {monthDate.toLocaleString('ko-KR', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            aria-label='Next Month'
            className={
              'react-datepicker__navigation react-datepicker__navigation--next'
            }
            // 0-> 왼쪽 달력, 1-> 오른쪽 달력
            style={
              customHeaderCount === 0 ? { visibility: 'hidden' } : undefined
            }
            onClick={increaseMonth}
          >
            <span
              className={
                'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
              }
            >
              {'>'}
            </span>
          </button>
        </div>
      )}
    />
  );
}
