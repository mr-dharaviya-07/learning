import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [url]);

  return [data];
}
