import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { axiosAuthGet } from '../configs/axiosInstance';
import { accessTokenKey } from '../constant/constant';

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

const ChartView = ({ selectedDate, selectedDateRange }) => {
  const [chartData, setChartData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [maxEarnings, setMaxEarnings] = useState(0);
  const [minEarnings, setMinEarnings] = useState(0);

  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem(accessTokenKey);
      const response = await axiosAuthGet('/event/get-list-event', accessToken, {
        limit: Infinity,
      });

      const formattedListEvents = response.listEvent.map((item) => ({
        label: formatDate(item.dateTime),
        earnings: 1,
      }));

      const aggregatedData = [];
      formattedListEvents.forEach((item) => {
        const existingItem = aggregatedData.find((aggItem) => aggItem.label === item.label);
        if (existingItem) {
          existingItem.earnings += item.earnings;
        } else {
          aggregatedData.push(item);
        }
      });

      const sortedAggregatedData = aggregatedData.sort(
        (a, b) => new Date(a.label) - new Date(b.label),
      );

      setChartData(sortedAggregatedData);
      console.log(sortedAggregatedData);

      setTotalEarnings(sortedAggregatedData.reduce((acc, item) => acc + item.earnings, 0));
      setMaxEarnings(Math.max(...sortedAggregatedData.map((item) => item.earnings)));
      setMinEarnings(Math.min(...sortedAggregatedData.map((item) => item.earnings)));
    })();
  }, []);

  // Format DateTime
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  console.log(chartData);

  return (
    <View style={styles.chartContainer}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={30}
        containerComponent={<VictoryContainer />}
      >
        <VictoryAxis
          tickValues={chartData.map((item, index) => index)}
          tickFormat={chartData.map((item) => item.label)}
          tickLabelComponent={<VictoryLabel angle={-45} style={{ fontSize: 8 }} />}
        />

        <VictoryAxis dependentAxis tickFormat={(x) => `${x}`} />
        <VictoryBar
          data={chartData}
          x="label"
          y="earnings"
          labels={({ datum }) => `${datum.earnings}`}
          labelComponent={<VictoryTooltip renderInPortal={false} />}
        />
      </VictoryChart>

      <Text style={styles.title}>Sự kiện</Text>
      <Text style={styles.totalEarningsText}>Tổng cộng: {totalEarnings}</Text>
      <Text style={styles.maxEarningsText}>Cao nhất: {maxEarnings}</Text>
      <Text style={styles.minEarningsText}>Thấp nhất: {minEarnings}</Text>
    </View>
  );
};

const StatisticsScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDatesCount, setSelectedDatesCount] = useState(0);

  const [filteredData, setFilteredData] = useState(chartData);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  const handleBarClick = (data) => {
    setSelectedDate(data.datum.date);
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Color.colorText} style={styles.loadingContainer} />
      ) : (
        <>
          <ToolbarStatistics />

          <ChartView
            onBarClick={handleBarClick}
            selectedDate={selectedDate}
            data={filteredData}
            selectedDatesCount={selectedDatesCount}
            selectedDateRange={selectedDateRange}
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
  imageFilter: {
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
    marginBottom: 20,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  totalEarningsText: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
  },
  maxEarningsText: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 10,
  },
  minEarningsText: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 10,
  },
});

export default StatisticsScreen;
