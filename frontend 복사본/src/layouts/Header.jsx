import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDialog } from './Layout';
import InputField from '../components/InputField';
import PassengerCountDialog from '../components/PassengerCountDialog';
import TextDialog from '../components/TextDialog';
import DateDialog from '../components/DateDialog';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  width: 85%;
  background-color: ${(props) => (props.activeField ? '#d9d9d9' : '#fff')};
  gap: 2px;
  border-radius: 50px;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`;

const InputFieldWrapper = styled.div`
  flex: ${(props) => props.flex};
  position: relative;
  padding: 10px 10px 10px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  cursor: text;
  background-color: ${(props) =>
    props.active || !props.activeField ? '#fff' : '#d9d9d9'};

  &:first-of-type {
    margin-left: 0; /* 첫 번째 InputFieldWrapper의 왼쪽 여백을 없앰 */
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

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: #666;
  z-index: 2;
  &:hover {
    color: black;
  }
`;

const Header = () => {
  const { openDialog, closeDialog } = useDialog();
  const [departures, setDepartures] = useState('');
  const [arrivals, setArrivals] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [passengers, setPassengers] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  const [activeField, setActiveField] = useState(null);

  const handlePassengerDialogChange = (updatedPassengers) => {
    setPassengers(updatedPassengers);
  };

  const getPassengerText = () => {
    const { adults, children, infants } = passengers;
    const parts = [];
    if (adults > 0) parts.push(`성인 ${adults}`);
    if (children > 0) parts.push(`어린이 ${children}`);
    if (infants > 0) parts.push(`유아 ${infants}`);
    return parts.length > 0 ? parts.join(', ') : '탑승객 추가';
  };

  const handleOpenDialog = (field) => {
    setActiveField(field);
    switch (field) {
      case 'locations':
        openDialog(
          <TextDialog
            open={true}
            onClose={() => closeDialog()}
            title='출발지 및 도착지 선택'
            departures={departures}
            arrivals={arrivals}
            setDepartures={setDepartures}
            setArrivals={setArrivals}
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
      case 'passengers':
        openDialog(
          <PassengerCountDialog
            onClose={() => closeDialog()}
            onChange={handlePassengerDialogChange}
          />
        );
        break;
      default:
        break;
    }
  };

  return (
    <HeaderContainer>
      <Link to={'/'}>
        <div>홈으로</div>
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
            value={`${departures} - ${arrivals}`}
            onClick={() => handleOpenDialog('locations')}
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
              departureDate ? departureDate.toLocaleDateString() : ''
            } - ${arrivalDate ? arrivalDate.toLocaleDateString() : ''}`}
            onClick={() => handleOpenDialog('dates')}
          />
        </InputFieldWrapper>
        <InputFieldWrapper
          flex='1.5'
          active={activeField === 'passengers'}
          activeField={activeField}
          onClick={() => handleOpenDialog('passengers')}
          onMouseEnter={() => setActiveField('passengers')}
          onMouseLeave={() => setActiveField(null)}
        >
          <InputField
            label='탑승 정보'
            value={getPassengerText()}
            readOnly
            onClick={() => handleOpenDialog('passengers')}
          />
        </InputFieldWrapper>
        <div
          style={{
            marginRight: '20px',
          }}
        >
          <Avatar
            sx={{
              bgcolor: '#ff385c',
              width: 48,
              height: 48,
              padding: '20px',
              cursor: 'pointer',
              ':active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <Search />
          </Avatar>
        </div>
      </InputContainer>
    </HeaderContainer>
  );
};

export default Header;
