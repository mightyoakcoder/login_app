import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  /** custom hook */
  //eslint-disable-next-line
  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, isloading: true}))

        const { data, status } = await axios.get(`/api/${query}`);

        if(status === 201){
          setData(prev => ({ ...prev, isloading: false}));
          setData(prev => ({ ...prev, apiData: data, status: status}));
        }

        setData(prev => ({ ...prev, isloading: false}))
      } catch (error) {
        setData(prev => ({ ...prev, isloading: false, serverError: error}))
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
}
