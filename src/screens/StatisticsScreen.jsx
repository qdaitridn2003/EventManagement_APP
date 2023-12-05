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

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 14250 },
  { quarter: 5, earnings: 19000 },
  { quarter: 6, earnings: 67000 },
  { quarter: 7, earnings: 39000 },
  { quarter: 8, earnings: 9000 },
  { quarter: 9, earnings: 9000 },
];

const ToolbarStatistics = () => {
  return (
    <View style={styles.nameScreenAndBtnAdd}>
      <View style={styles.textFlexBox}>
        <Text style={styles.dashboard}>Thống kê</Text>
        <Image style={styles.logoEvent} source={require('../assets/icon--employee2.png')} />
      </View>
      <TouchableOpacity>
        <Image style={styles.buttonFab} source={require('../assets/icons8-filter-80.png')} />
      </TouchableOpacity>
    </View>
  );
};

const SelectedCalendar = () => {
  return (
    <View style={styles.calendarContainer}>
      <TouchableOpacity>
        <Image source={require('../assets/icon--event2.png')} style={styles.imageCalendar} />
      </TouchableOpacity>
      <Text>11/09/2023</Text>
      <Text>---</Text>
      <Text>19/09/2023</Text>
    </View>
  );
};

const ChartView = () => {
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
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
          labels={({ datum }) => `$${datum.earnings / 1000}k`}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </View>
  );
};

const ShowDetailChart = ({ selectedQuarter }) => {
  const selectedData = data.find((item) => item.quarter === selectedQuarter);

  return (
    <View>
      {selectedData && (
        <>
          <Text>Quarter: {selectedData.quarter}</Text>
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
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const { average, maxEarnings, minEarnings } = calculateStatistics(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  const handleBarClick = (data) => {
    setSelectedQuarter(data.datum.quarter);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Color.colorText} style={styles.loadingContainer} />
      ) : (
        <>
          <ToolbarStatistics />
          <SelectedCalendar />
          <ChartView onBarClick={handleBarClick} />
          <ShowDetailChart selectedQuarter={selectedQuarter} />
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