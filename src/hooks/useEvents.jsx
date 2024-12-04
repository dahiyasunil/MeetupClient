import { useState, useEffect } from "react";

export const useEvents = (url, initialState) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("HTTP Error:", response.status, response.statusText);
        const errorData = await response.json();
        throw new Error(
          `Status: ${response.status} | Message: ${
            errorData.message || response.statusText
          }`
        );
      }
      const responseData = await response.json();
      setData(responseData.data);
    } catch (error) {
      console.error(`An error occured while trying to fetch Events Data.
        Error: ${error.stack}`);
      setError(
        `An error occured while trying to fetch Events Data. Please try again later!`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, fetchData };
};
