import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import koLocale from 'date-fns/locale/ko';

const DateDialog = ({
  open,
  onClose,
  title,
  departureDate,
  arrivalDate,
  setDepartureDate,
  setArrivalDate,
}) => {
  const [departureValue, setDepartureValue] = useState(departureDate || null);
  const [arrivalValue, setArrivalValue] = useState(arrivalDate || null);

  const handleConfirm = () => {
    setDepartureDate(departureValue);
    setArrivalDate(arrivalValue);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
          <DatePicker
            label='출발일 선택'
            value={departureValue}
            onChange={(newValue) => setDepartureValue(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
            label='도착일 선택'
            value={arrivalValue}
            onChange={(newValue) => setArrivalValue(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleConfirm}>확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateDialog;
