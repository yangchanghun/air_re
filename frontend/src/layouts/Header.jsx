import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDialog } from './Layout';
import useDateFormat from '../hooks/useDateFormat';
import axios from 'axios';
import InputField from '../components/InputField';
import DateDialog from '../components/DateDialog';
import CountriesDialog from '../components/CountriesDialog';
import AirlineDialog from '../components/AirlineDialog';
import ClassDialog from '../components/ClassDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png';
import { FlightInfoContext } from '../context/FlightInfoContext';

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 60px;
`;

const InputContainer = styled.div`
  display: flex;
  width: 80%;
  height: 60px; /* 고정 높이 설정 */
  min-width: 500px;
  background-color: ${(props) => (props.activeField ? '#d9d9d9' : '#fff')};
  gap: 2px;
  border-radius: 50px;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`;

const InputFieldWrapper = styled.div`
  flex: ${(props) => props.flex};
  height: 100%; /* 높이를 부모 컨테이너에 맞춤 */
  position: relative;
  padding: 4px 10px 0 30px; /* 패딩 수정 */
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  cursor: text;
  background-color: ${(props) =>
    props.active || !props.activeField ? '#fff' : '#d9d9d9'};

  &:first-of-type {
    margin-left: 0;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }

  &:last-of-type {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }

  &:focus-within,
  &:hover {
    box-shadow: 0 0 0 2px #ff385c;
    background-color: #fff;
  }
`;

const Header = () => {
  const { openDialog, closeDialog } = useDialog();
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [flightClass, setFlightClass] = useState(null);
  const [airline, setAirline] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const { updateSearchResults } = useContext(FlightInfoContext);

  const { formatDate } = useDateFormat();

  const handleOpenDialog = (field) => {
    setActiveField(field);
    switch (field) {
      case 'locations':
        openDialog(
          <CountriesDialog
            open={true}
            onClose={() => closeDialog()}
            title='출발지 및 도착지 선택'
            setDeparture={setDeparture}
            setDestination={setDestination}
          />
        );
        break;
      case 'dates':
        openDialog(
          <DateDialog
            open={true}
            onClose={() => closeDialog()}
            title='출발일 및 도착일 선택'
            departureDate={departureDate}
            arrivalDate={arrivalDate}
            setDepartureDate={setDepartureDate}
            setArrivalDate={setArrivalDate}
          />
        );
        break;
      case 'airlines':
        openDialog(
          <AirlineDialog
            open={true}
            onClose={() => closeDialog()}
            setAirline={setAirline}
          />
        );
        break;
      case 'classes':
        openDialog(
          <ClassDialog
            open={true}
            onClose={() => closeDialog()}
            setFlightClass={setFlightClass}
          />
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const params = {
      ...(departure && { departures: departure }),
      ...(destination && { arrivals: destination }),
      ...(departureDate && { departure_date: formatDate(departureDate) }),
      ...(arrivalDate && { arrival_date: formatDate(arrivalDate) }),
      ...(flightClass && { flightClass: flightClass }),
      ...(airline && { airline }),
    };

    console.log(params);

    const queryString = new URLSearchParams(params).toString();

    console.log(queryString);

    try {
      const response = await axios.get(
        `http://localhost:8080/flights?${queryString}`
      );
      updateSearchResults(response.data.flights, params);
      console.log('Data retrieved successfully:', response.data.flights);
    } catch (error) {
      toast.error('데이터를 가져오는 중 오류가 발생했습니다.');
      console.error('Error retrieving data:', error);
    }
  };

  return (
    <>
      <HeaderContainer>
        <Link to={'/'}>
          <img src={logo} alt='홈으로' style={{ height: '40px' }} />
        </Link>
        <InputContainer activeField={activeField}>
          <InputFieldWrapper
            flex='1.5'
            active={activeField === 'locations'}
            activeField={activeField}
            onClick={() => handleOpenDialog('locations')}
            onMouseEnter={() => setActiveField('locations')}
            onMouseLeave={() => setActiveField(null)}
          >
            <InputField
              label='출발지 및 도착지 선택'
              placeholder='출발지와 도착지를 선택해주세요'
              value={`${departure ? departure.toString() : '출발지'} - ${
                destination ? destination.toString() : '도착지'
              }`}
              onClick={() => handleOpenDialog('locations')}
              readOnly
            />
          </InputFieldWrapper>
          <InputFieldWrapper
            flex='1.5'
            active={activeField === 'dates'}
            activeField={activeField}
            onClick={() => handleOpenDialog('dates')}
            onMouseEnter={() => setActiveField('dates')}
            onMouseLeave={() => setActiveField(null)}
          >
            <InputField
              label='출발일 및 도착일 선택'
              placeholder='출발일과 도착일을 선택해주세요'
              value={`${
                departureDate ? formatDate(departureDate) : 'YYYY-MM-DD'
              } - ${arrivalDate ? formatDate(arrivalDate) : 'YYYY-MM-DD'}`}
              onClick={() => handleOpenDialog('dates')}
              readOnly
            />
          </InputFieldWrapper>
          <InputFieldWrapper
            flex='1.5'
            active={activeField === 'airlines'}
            activeField={activeField}
            onClick={() => handleOpenDialog('airlines')}
            onMouseEnter={() => setActiveField('airlines')}
            onMouseLeave={() => setActiveField(null)}
          >
            <InputField
              label='항공사 선택'
              placeholder='항공사를 선택해주세요'
              value={`${airline ? airline.toString() : '항공사'}`}
              onClick={() => handleOpenDialog('airlines')}
              readOnly
            />
          </InputFieldWrapper>
          <InputFieldWrapper
            flex='1.5'
            active={activeField === 'classes'}
            activeField={activeField}
            onClick={() => handleOpenDialog('classes')}
            onMouseEnter={() => setActiveField('classes')}
            onMouseLeave={() => setActiveField(null)}
          >
            <InputField
              label='클래스 선택'
              placeholder='클래스를 선택해주세요'
              value={`${flightClass ? flightClass.toString() : '클래스'}`}
              onClick={() => handleOpenDialog('classes')}
              readOnly
            />
          </InputFieldWrapper>
          <div
            style={{
              margin: '0 20px',
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#ff385c',
                width: 48,
                height: 48,
                cursor: 'pointer',
                ':active': {
                  transform: 'scale(0.95)',
                },
              }}
              onClick={handleSubmit}
            >
              <Search />
            </Avatar>
          </div>
        </InputContainer>
      </HeaderContainer>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar
      />
    </>
  );
};

export default Header;
