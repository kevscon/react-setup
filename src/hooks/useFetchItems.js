import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchItems = (url) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(url);
        setItems(response.data);
      } catch (err) {
        setError(err);
        console.error('Error fetching items:', err);
      }
    };
    fetchItems();
  }, [url]);

  return { items, error };
};

export default useFetchItems;