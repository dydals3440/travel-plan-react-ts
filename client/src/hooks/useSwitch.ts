import { useState } from 'react';

export default function useSwitch() {
  const [on, setOn] = useState(false);

  const toggle = () => setOn((prev) => !prev);
  const setOnTrue = () => setOn(true);
  const setOnFalse = () => setOn(false);

  return { on, toggle, setOnTrue, setOnFalse };
}
