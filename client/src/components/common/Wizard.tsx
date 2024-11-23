import { ReactNode, useState } from 'react';
import cn from 'classnames';
import Button from './Button';

// 다른데에서도 사용하기에 빼줌
type Step = {
  title: string;
  // render props 컨텐츠 컴포넌트에 onNext를 주입시킬려고 그럼.
  content: ({ onNext }: { onNext: () => void }) => ReactNode;
};

interface Props {
  steps: Step[];
  onCompleted?: () => void;
}

// currentIndex에 대한 정보 어디에 저장?
// 일반적으로, 컴포넌트 내부에서만 사용하는 상태는 useState를 사용.
// UI에 대한 state, 컴포넌트를 넘나드는 상태면 Context API
// 전역에서 관리되는 데이터들은 Zustand와 같은 상태관리 라이브러리에 사용.

// 위자드 컴포넌트에서, 컨텐츠들을 내부 프롭으로 사용.
// state가 변경될떄마다, content가 변경이 되어야 함. -> useState
export default function Wizard({ steps, onCompleted }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const onNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // 버튼 UI 렌더링
  return (
    <div className='flex'>
      <Steps
        steps={steps}
        currentStep={currentStep}
        onChangeStep={setCurrentStep}
        onCompleted={onCompleted}
      />
      {/* content에 onNext를 넘겨줌 */}
      {steps[currentStep].content({ onNext })}
    </div>
  );
}

function Steps({
  steps,
  currentStep,
  onChangeStep,
  onCompleted,
}: {
  steps: Step[];
  currentStep: number;
  onChangeStep: (index: number) => void;
  onCompleted?: () => void;
}) {
  return (
    <div className='flex flex-col justify-between items-center py-50 px-20 w-140'>
      <ul className='w-78 flex flex-col gap-y-30'>
        {steps.map((step, index) => {
          const active = index === currentStep;

          return (
            <li
              key={index}
              className={cn('text-15 font-semibold leading-[1.5]', {
                'text-main': active,
                'text-gray300': !active,
              })}
            >
              <button onClick={() => onChangeStep(index)}>
                STEP {index + 1}
                <br />
                {step.title}
              </button>
            </li>
          );
        })}
      </ul>
      {currentStep < steps.length - 1 ||
        (onCompleted && (
          <Button
            className='px-36'
            onClick={() =>
              currentStep < steps.length - 1
                ? onChangeStep(currentStep + 1)
                : onCompleted?.()
            }
          >
            다음
          </Button>
        ))}
    </div>
  );
}
