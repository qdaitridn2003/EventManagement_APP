import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryTooltip,
  VictoryContainer,
} from 'victory-native';

import { Border, Color, FontSize } from '../components/styles/GlobalStyles';
import Calendar from './items/Calendar';

// Thay đổi cấu trúc của data để thêm thông tin về ngày
const data = [
  { date: '2023-12-01', earnings: 13000 },
  { date: '2023-12-11', earnings: 16500 },
  { date: '2023-12-19', earnings: 14250 },
  { date: '2023-12-18', earnings: 14250 },
  { date: '2023-12-02', earnings: 14250 },
  { date: '2023-12-16', earnings: 14250 },
  { date: '2023-12-19', earnings: 14250 },
  { date: '2023-12-17', earnings: 14250 },
];

const ToolbarStatistics = ({ onPressFilter, selectedDatesCount }) => {
  return (
    <View style={styles.nameScreenAndBtnAdd}>
      <View style={styles.textFlexBox}>
        <Text style={styles.dashboard}>Thống kê</Text>
        <Image style={styles.logoEvent} source={require('../assets/icon--employee2.png')} />
      </View>
      <TouchableOpacity onPress={onPressFilter}>
        <Image style={styles.buttonFab} source={require('../assets/icons8-filter-80.png')} />
        <Text style={styles.selectedDatesCountText}>{selectedDatesCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SelectedCalendar = ({ onSelectDate }) => {
  return (
    <View style={styles.calendarContainer}>
      <Calendar onSelectDate={onSelectDate} />
      <Text> --- </Text>
      <Calendar onSelectDate={onSelectDate} />
    </View>
  );
};

const ChartView = ({ onBarClick, selectedDate, data }) => {
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
          tickValues={data.map((item, index) => index + 1)} // Sử dụng chỉ số của mảng làm giá trị của tick
          tickFormat={(tick) => (selectedDate ? formatDate(data[tick - 1].date) : tick)}
          tickLabelComponent={<VictoryLabel angle={-45} style={{ fontSize: 8 }} />}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
        <VictoryBar
          data={data}
          x="date"
          y="earnings"
          labels={({ datum }) => `$${datum.earnings / 1000}k`}
          labelComponent={<VictoryTooltip renderInPortal={false} />}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onClick: () => [
                  {
                    target: 'data',
                    mutation: (props) => {
                      onBarClick(props);
                    },
                  },
                ],
              },
            },
          ]}
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
    setSelectedDatesCount(selectedDatesCount + 1);
    console.log(`Selected Date: ${date}, Total Selected Dates: ${selectedDatesCount + 1}`);
    setSelectedDate(date);
  };

  const handleFilterPress = () => {
    const filteredData = data.filter((item) => {
      return item.date === selectedDate;
    });

    setFilteredData(filteredData);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Color.colorText} style={styles.loadingContainer} />
      ) : (
        <>
          <ToolbarStatistics
            onPressFilter={handleFilterPress}
            selectedDatesCount={selectedDatesCount}
          />
          <SelectedCalendar onSelectDate={handleSelectDate} />
          <ChartView onBarClick={handleBarClick} selectedDate={selectedDate} data={filteredData} />
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
