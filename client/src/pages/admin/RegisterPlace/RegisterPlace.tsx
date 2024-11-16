import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function RegisterPlace() {
  const [searchParams] = useSearchParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const registerPlace = async () => {
    const city = searchParams.get('city');
    const place = textareaRef.current?.value;

    if (!place || !city) {
      return;
    }

    const response = await fetch(`/api/cities/${city}/places`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: place,
    });

    if (response.ok) {
      textareaRef.current!.value = '';
      alert('Place Registered');
    } else {
      alert('Failed to register place');
    }
  };

  return (
    <div>
      <div>
        <textarea ref={textareaRef} />
      </div>
      <button onClick={registerPlace}>등록</button>
    </div>
  );
}
