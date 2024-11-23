import { ReactNode, useState } from 'react';
import cn from 'classnames';

// 다른데에서도 사용하기에 빼줌
type Tab = {
  title: string;
  // render props 컨텐츠 컴포넌트에 onNext를 주입시킬려고 그럼.
  content: () => ReactNode;
};

interface Props {
  className?: string;
  tabs: Tab[];
}

// currentIndex에 대한 정보 어디에 저장?
// 일반적으로, 컴포넌트 내부에서만 사용하는 상태는 useState를 사용.
// UI에 대한 state, 컴포넌트를 넘나드는 상태면 Context API
// 전역에서 관리되는 데이터들은 Zustand와 같은 상태관리 라이브러리에 사용.

// 위자드 컴포넌트에서, 컨텐츠들을 내부 프롭으로 사용.
// state가 변경될떄마다, content가 변경이 되어야 함. -> useState
export default function Tabs({ tabs, className }: Props) {
  const [currentTab, setCurrentTab] = useState(0);

  // 버튼 UI 렌더링
  return (
    <div className={cn('flex', className)}>
      <TabsButtonList
        tabs={tabs}
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
      />
      {/* content에 onNext를 넘겨줌 */}
      {tabs[currentTab].content()}
    </div>
  );
}

function TabsButtonList({
  tabs,
  currentTab,
  onChangeTab,
}: {
  tabs: Tab[];
  currentTab: number;
  onChangeTab: (index: number) => void;
}) {
  return (
    <div className='flex flex-col justify-between items-center py-50 px-20 w-140'>
      <ul className='flex flex-col'>
        {tabs.map((tab, index) => {
          const active = index === currentTab;

          return (
            <li
              key={index}
              className={cn(
                // 첫번째, 마지막 요소들에 대한 스타일링
                'py-15 px-24 text-16 tracking-[0.16px] first:rounded-t-6 last:rounded-b-6',
                {
                  'text-[#fff] bg-black font-medium': active,
                  'text-black bg-bg': !active,
                }
              )}
            >
              <button onClick={() => onChangeTab(index)}>{tab.title}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
