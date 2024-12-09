import React, { useState } from 'react';
import axios from 'axios';

type SubscribeResponse = {
  message: string;
};

const SubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post<SubscribeResponse>('http://localhost:8000/api/subscribe', { email })
      .then(response => {
        alert(response.data.message); // TypeScript now knows 'message' exists
      })
      .catch(error => {
        alert('Error subscribing');
        console.error('Subscription error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default SubscriptionForm;
