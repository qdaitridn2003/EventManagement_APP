import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryTooltip,
  VictoryContainer,
} from 'victory-native';

import Calendar from './statistics/Calendar';
import { Border, Color, FontSize } from '../components/styles/GlobalStyles';

const data = [
  { date: '2023-12-01', earnings: 3 },
  { date: '2023-12-07', earnings: 6 },
  { date: '2023-12-18', earnings: 4 },
  { date: '2023-12-17', earnings: 4 },
  { date: '2023-12-13', earnings: 1 },
  { date: '2023-12-12', earnings: 4 },
  { date: '2023-12-11', earnings: 15 },
  { date: '2023-12-17', earnings: 4 },
  { date: '2023-12-18', earnings: 1 },
  { date: '2023-12-28', earnings: 2 },
  { date: '2023-12-16', earnings: 4 },
];

const parseDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const sortedData = [...data].sort((a, b) => parseDate(a.date) - parseDate(b.date));
// console.log('Data Dates:', sortedData);

const aggregatedData = [];
sortedData.forEach((item) => {
  const existingItem = aggregatedData.find((aggItem) => aggItem.date === item.date);
  if (existingItem) {
    existingItem.earnings += item.earnings;
  } else {
    aggregatedData.push({ date: item.date, earnings: item.earnings });
  }
});
// console.log('Aggregated Data:', aggregatedData);

const ToolbarStatistics = () => {
  return (
    <View style={styles.nameScreenAndBtnAdd}>
      <View style={styles.textFlexBox}>
        <Text style={styles.dashboard}>Thống kê</Text>
        <Image style={styles.logoEvent} source={require('../assets/icon--employee2.png')} />
      </View>
    </View>
  );
};

const SelectedCalendar = ({ onSelectDate, onConfirm }) => {
  const handleDateSelection = (date) => {
    onSelectDate(date);
  };

  return (
    <View style={styles.calendarContainer}>
      <Calendar onSelectDate={onSelectDate} onConfirm={onConfirm} />
    </View>
  );
};

const ChartView = ({ onBarClick, selectedDate, data, selectedDatesCount }) => {
  // Format dd/MM/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.chartContainer}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={12}
        containerComponent={<VictoryContainer />}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          tickFormat={[
            '11/09/2023',
            '12/09/2023',
            '13/09/2023',
            '14/09/2023',
            '15/09/2023',
            '16/09/2023',
            '17/09/2023',
            '18/09/2023',
            '19/09/2023',
          ]}
          tickLabelComponent={<VictoryLabel angle={-45} style={{ fontSize: 8 }} />}
        />

        <VictoryAxis dependentAxis tickFormat={(x) => `${x}`} />
        <VictoryBar
          data={sortedData}
          x="date"
          y="earnings"
          labels={({ datum }) => `${datum.earnings}`}
          labelComponent={<VictoryTooltip renderInPortal={false} />}
        />
      </VictoryChart>
    </View>
  );
};

const ShowDetailChart = ({ selectedDate, data }) => {
  const selectedData = data.find((item) => item.date === selectedDate);

  return (
    <View>
      {selectedData && (
        <>
          <Text>Date: {selectedData.date}</Text>
          <Text>Earnings: {selectedData.earnings}</Text>
        </>
      )}
    </View>
  );
};

const calculateStatistics = (data) => {
  const earningsArray = data.map((item) => item.earnings);

  const sum = earningsArray.reduce((acc, value) => acc + value, 0);
  const average = Math.round((sum / earningsArray.length) * 100) / 100;

  const maxEarnings = Math.max(...earningsArray);
  const minEarnings = Math.min(...earningsArray);

  return { average, maxEarnings, minEarnings };
};

const SummaryStatistics = ({ average, maxEarnings, minEarnings }) => {
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.summary}>Tổng kết</Text>
      <View>
        <Text style={styles.detailSummary}>Trung bình: {average}</Text>
        <Text style={styles.detailSummary}>Cao nhất: {maxEarnings}</Text>
        <Text style={styles.detailSummary}>Thấp nhất: {minEarnings}</Text>
      </View>
    </View>
  );
};

const StatisticsScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDatesArray, setSelectedDatesArray] = useState([]);
  const [selectedDatesCount, setSelectedDatesCount] = useState(0);

  const [filteredData, setFilteredData] = useState(data);
  const { average, maxEarnings, minEarnings } = calculateStatistics(filteredData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  const handleBarClick = (data) => {
    setSelectedDate(data.datum.date);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedDatesArray((prevDates) => [...prevDates, date]);
    setSelectedDatesCount((prevCount) => prevCount + 1);
  };

  const handleFilterPress = () => {
    console.log('Mảng số ngày đã được chọn:', selectedDatesArray);

    const filteredData = data.filter((item) => {
      return item.date === selectedDate;
    });

    setFilteredData(filteredData);
  };

  const handleConfirm = (selectedDates) => {
    console.log('Ngày đã chọn từ Calendar: ', selectedDates);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Color.colorText} style={styles.loadingContainer} />
      ) : (
        <>
          <ToolbarStatistics onPressFilter={handleFilterPress} />
          <SelectedCalendar onSelectDate={handleSelectDate} onConfirm={handleConfirm} />

          <ChartView
            onBarClick={handleBarClick}
            selectedDate={selectedDate}
            data={filteredData}
            selectedDatesCount={selectedDatesCount}
          />

          <ShowDetailChart selectedDate={selectedDate} data={filteredData} />
          <SummaryStatistics
            average={average}
            maxEarnings={maxEarnings}
            minEarnings={minEarnings}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: Color.neutral4,
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailContainer: {
    marginTop: 16,
  },
  calendarContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageCalendar: {
    width: 30,
    height: 30,
  },
  detailTitle: {
    textAlign: 'center',
  },
  nameScreenAndBtnAdd: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 10,
  },
  summary: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.colorText,
  },
  detailSummary: {
    fontSize: 14,
    padding: 5,
    marginLeft: 10,
  },
  textFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboard: {
    fontSize: FontSize.title24Bold_size,
    lineHeight: 29,
    textAlign: 'left',
    color: Color.colorMidnightblue,
    fontWeight: '700',
  },
  logoEvent: {
    marginLeft: 8,
    height: 24,
    width: 24,
  },
  buttonFab: {
    width: 30,
    height: 30,
    overflow: 'hidden',
    borderRadius: Border.br_xs,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatisticsScreen;
