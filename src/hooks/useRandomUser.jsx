import { useState, useEffect } from "react";

function useRandomUser(url, initialData) {
  const [speakersData, setSpeakersData] = useState(initialData);
  const [speakersDataLoading, setSpeakersDataLoading] = useState(true);
  const [speakersDataError, setSpeakersDataError] = useState(null);

  const fetchSpeakerData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSpeakersData(data.results);
      setSpeakersDataLoading(false);
    } catch (error) {
      setSpeakersDataError(error);
      setSpeakersDataLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakerData();
  }, [url]);

  return {
    speakersData,
    speakersDataLoading,
    speakersDataError,
    fetchSpeakerData,
  };
}

export default useRandomUser;
