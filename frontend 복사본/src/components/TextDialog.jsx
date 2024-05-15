import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';

const TextDialog = ({
  open,
  onClose,
  title,
  departures,
  arrivals,
  setDepartures,
  setArrivals,
}) => {
  const [departureValue, setDepartureValue] = useState(departures || '');
  const [arrivalValue, setArrivalValue] = useState(arrivals || '');

  const handleConfirm = () => {
    setDepartures(departureValue);
    setArrivals(arrivalValue);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='출발지 선택'
          type='text'
          fullWidth
          value={departureValue}
          onChange={(e) => setDepartureValue(e.target.value)}
        />
        <TextField
          margin='dense'
          label='도착지 선택'
          type='text'
          fullWidth
          value={arrivalValue}
          onChange={(e) => setArrivalValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleConfirm}>확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TextDialog;
