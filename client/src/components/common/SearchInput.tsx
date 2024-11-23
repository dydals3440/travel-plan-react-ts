import useThrottle from '@/hooks/common/useThrottle';
import SearchIcon from '@icons/search.svg?react';
import { ChangeEvent, useState } from 'react';

interface Props {
  onCompositionEnd: (value: string) => void;
}

export default function SearchInput({ onCompositionEnd }: Props) {
  const [search, setSearch] = useState('');

  const throttle = useThrottle();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
    throttle(() => {
      onCompositionEnd(value);
      console.log(value);
    }, 300);
  };

  return (
    <div className='w-full relative'>
      <input
        className='w-full rounded-10 h-40 border border-gray200 pl-10 pr-46'
        type='text'
        value={search}
        // onChange={(e) => setSearch(e.currentTarget.value)}
        // 문장이 구성되었을 떄 이벤트 발생시키고싶음
        // 별도 이벤트를 받는 이유, onChange가 발생했을 떄 state로 관리하게 되면, 아예 업데이트가 되지 않아서, 별도의 함수로 관리함.
        // onCompositionEnd={(e) => onCompositionEnd(e.currentTarget.value)}

        onChange={handleSearch}
      />
      <SearchIcon className='absolute top-9 right-12' />
    </div>
  );
}
