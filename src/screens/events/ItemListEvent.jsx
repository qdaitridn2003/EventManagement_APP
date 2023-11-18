import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Color, FontSize, Border } from '../../components/styles/GlobalStyles';

const ItemListEvent = props => {
  const { data } = props;
  return (
    <View style={styles.eventList}>
      <View style={styles.cardEvent}>
        <Image
          style={[styles.avatarIcon, styles.avatarIconLayout]}
          contentFit="cover"
          source={require('../../assets/avatar-28x2813x.png')}
        />
        <Image
          style={[styles.avatarIcon1, styles.avatarIconLayout]}
          contentFit="cover"
          source={require('../../assets/avatar-28x2823x.png')}
        />
        <Image
          style={[styles.avatarIcon2, styles.avatarIconLayout]}
          contentFit="cover"
          source={require('../../assets/avatar-28x283x.png')}
        />
        <View style={[styles.avtarPlus, styles.avatarIconLayout]}>
          <Text style={[styles.textPlus, styles.textTypo]}>+4</Text>
        </View>
        <Text style={styles.textNameEvent}>{data.name}</Text>
        <Text style={[styles.text1, styles.textTypo1]}>{data.startDay}</Text>
        <Text style={[styles.text2, styles.sKinClr]}>{data.endDay}</Text>
        <View style={[styles.text4, styles.textFlexBox]}>
          <Text style={[styles.text5, styles.textTypo]}>{data.progress}</Text>
          <View style={styles.indicator}>
            <View style={[styles.indicator1, styles.indicatorPosition]} />
            <View style={[styles.indicator2, styles.indicatorPosition]} />
          </View>
          <Text style={[styles.tasks, styles.textTypo]} />
        </View>
        <Image
          style={[styles.iconCalendar, styles.iconLayout]}
          source={require('../../assets/calendar2.png')}
        />
        <Image
          style={[styles.iconCalendar1, styles.iconLayout]}
          source={require('../../assets/calendar.png')}
        />
        <Image style={styles.arrowIcon} source={require('../../assets/arrow.png')} />
      </View>
    </View>
  );
};

export default ItemListEvent;

const styles = StyleSheet.create({
  eventList: {
    marginTop: 16,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  cardEvent: {
    borderRadius: Border.br_base,
    alignSelf: 'stretch',
    backgroundColor: Color.colorWhite,
    height: 148,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  avatarIconLayout: {
    height: 28,
    width: 28,
    top: 24,
    position: 'absolute',
  },
  avatarIcon: {
    left: 215,
  },
  avatarIcon1: {
    left: 235,
  },
  avatarIcon2: {
    left: 255,
  },
  avtarPlus: {
    left: 275,
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorDarkorange,
    overflow: 'hidden',
  },
  textPlus: {
    marginTop: -10,
    marginLeft: -8,
    top: '50%',
    left: '50%',
    color: Color.colorWhite,
    position: 'absolute',
    textAlign: 'left',
  },
  textTypo: {
    fontSize: FontSize.size_xs,
    lineHeight: 20,
    fontWeight: '500',
  },
  textNameEvent: {
    fontSize: FontSize.headlines18Bold_size,
    lineHeight: 28,
    left: 24,
    top: 24,
    position: 'absolute',
    textAlign: 'left',
    color: Color.neutral1,
    fontWeight: '700',
  },
  text1: {
    left: 48,
    color: Color.neutral2,
    textAlign: 'left',
  },
  text2: {
    left: 227,
    lineHeight: 20,
    fontSize: FontSize.body14Medium_size,
    top: 68,
    position: 'absolute',
    fontWeight: '500',
  },
  text3: {
    marginTop: -10,
    marginLeft: -8,
    top: '50%',
    left: '50%',
    color: Color.neutral4,
    position: 'absolute',
    textAlign: 'left',
  },
  text4: {
    top: 104,
    left: 24,
    position: 'absolute',
  },
  text5: {
    textAlign: 'left',
    color: Color.colorBlueviolet,
  },
  textTypo1: {
    lineHeight: 20,
    fontSize: FontSize.body14Medium_size,
    top: 68,
    position: 'absolute',
    fontWeight: '500',
  },
  sKinClr: {
    color: Color.colorBlueviolet,
    textAlign: 'left',
  },
  indicator: {
    height: 8,
    width: 167,
    marginLeft: 8,
    borderRadius: 16,
  },
  indicator1: {
    backgroundColor: Color.colorWhite,
    width: 167,
    borderRadius: 16,
  },
  indicator2: {
    width: 91,
    backgroundColor: Color.colorBlueviolet,
    borderRadius: 16,
  },
  indicatorPosition: {
    borderRadius: 8,
    height: 8,
    left: 28,
    top: -13,
    position: 'absolute',
  },
  tasks: {
    marginLeft: 8,
    textAlign: 'left',
    color: Color.neutral1,
  },
  textTypo2: {
    fontSize: FontSize.caption12Medium_size,
    lineHeight: 20,
    fontWeight: '500',
  },
  iconCalendar: {
    left: 24,
  },
  iconCalendar1: {
    left: 203,
  },
  iconLayout: {
    height: 16,
    width: 16,
    top: 70,
    position: 'absolute',
    overflow: 'hidden',
  },
  arrowIcon: {
    top: 71,
    left: 134,
    width: 59,
    height: 14,
    position: 'absolute',
  },
});
