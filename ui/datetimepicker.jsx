import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerComponent = ({ onDateTimeChange, initialDate = new Date() }) => {
  const [date, setDate] = useState(initialDate);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShow(false);
      return;
    }

    const currentDate = selectedDate || date;
    setDate(currentDate);

    if (mode === 'date') {
      // After date is picked, show time picker
      setMode('time');
      if (Platform.OS === 'ios') {
        // On iOS, we keep the picker visible and just change mode
        setShow(true);
      } else {
        // On Android, we need to hide and show again for the mode change
        setShow(false);
        setTimeout(() => setShow(true), 100);
      }
    } else {
      // After time is picked
      setShow(false);
      onDateTimeChange(currentDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.selectedDateTime}>
        {date.toLocaleString()}
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  selectedDateTime: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DateTimePickerComponent;