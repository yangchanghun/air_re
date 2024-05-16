import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from './AuthContext';

export const FlightInfoContext = createContext();

export const FlightInfoProvider = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [searchParams, setSearchParams] = useState({});

  const fetchFlights = async (page = 1, limit = 5, params = {}) => {
    try {
      const response = await axiosInstance.get('/flights', {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
        params: {
          page,
          limit,
          ...params,
        },
      });
      setFlights(response.data.flights);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const updateSearchResults = (newFlights, newTotalPages, params) => {
    setFlights(newFlights);
    setCurrentPage(1); // 검색 결과를 처음 페이지로 리셋
    setTotalPages(newTotalPages);
    setSearchParams(params);
  };

  useEffect(() => {
    fetchFlights(currentPage, 5, searchParams);
  }, [currentPage, searchParams]); // currentPage 또는 searchParams가 변경될 때 fetchFlights 호출

  return (
    <FlightInfoContext.Provider
      value={{
        flights,
        currentPage,
        totalPages,
        selectedFlight,
        setSelectedFlight,
        setCurrentPage,
        fetchFlights,
        updateSearchResults,
        searchParams,
      }}
    >
      {children}
    </FlightInfoContext.Provider>
  );
};
