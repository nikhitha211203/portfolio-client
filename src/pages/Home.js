import React, { useEffect, useState } from 'react';

function Home() {
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(data => setApiMessage(data.message))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Home Page</h2>
      <p>Message from backend: {apiMessage}</p>
    </div>
  );
}

export default Home;
