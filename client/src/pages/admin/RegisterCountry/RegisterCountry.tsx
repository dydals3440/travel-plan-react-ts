import { useRef } from 'react';

export default function RegisterCountry() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const registerCountry = async () => {
    const country = textareaRef.current?.value;
    console.log(country);

    if (!country) {
      return;
    }

    const response = await fetch('/api/countries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: country,
    });

    if (response.ok) {
      textareaRef.current!.value = '';
      alert('Country Registered');
    } else {
      alert('Failed To Register Country');
    }
  };
  return (
    <div>
      <div>
        <textarea ref={textareaRef} />
      </div>
      <button onClick={registerCountry}>등록</button>
    </div>
  );
}
