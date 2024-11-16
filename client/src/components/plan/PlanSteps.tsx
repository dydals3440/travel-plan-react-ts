import cn from 'classnames';
import Button from '../common/Button';

export default function PlanSteps() {
  const currentStep = 0;
  return (
    <div className='flex flex-col justify-between items-center py-20 px-20'>
      <ul className='w-78 flex flex-col gap-y-31'>
        {steps.map((step, index) => {
          const active = index === currentStep;

          return (
            <li
              key={index}
              className={cn(
                'text-15 font-semibold leading-[1.5] cursor-pointer',
                {
                  'text-main': active,
                  'text-gray300': !active,
                }
              )}
            >
              step {index + 1} <br /> {step.text}
            </li>
          );
        })}
      </ul>
      <Button className='px-36'>다음</Button>
    </div>
  );
}

const steps = [
  { text: '날짜 확인' },
  { text: '장소 선택' },
  { text: '숙소 선택' },
];
