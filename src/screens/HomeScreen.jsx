import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { Padding, Border, Color, FontSize } from '../components/styles/GlobalStyles';

const HomeScreen = () => {
  return (
    <View style={styles.events}>
      <View style={styles.navigationWithAddButton}>
        <View style={[styles.avatarAndDateItem, styles.textFlexBox]}>
          <Image
            style={styles.avatar44x44Icon}
            contentFit="cover"
            // source={require('../assets/avatar-44x44.png')}
          />
          <View style={styles.date}>
            <Text style={styles.amThHai}>9:30 AM, thứ Hai</Text>
            <Text style={styles.ngy25112023}>Ngày 25/11/2023</Text>
          </View>
        </View>
        <View style={[styles.iconButton, styles.iconButtonSpaceBlock]}>
          <Image
            style={styles.plusIcon}
            contentFit="cover"
            // source={require('../assets/plus-icon.png')}
          />
        </View>
      </View>
      <View style={[styles.searchBarParent, styles.eventListSpaceBlock]}>
        <View style={[styles.searchBar, styles.barShadowBox]}>
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            // source={require('../assets/vector.png')}
          />
          <View style={[styles.text, styles.textFlexBox]}>
            <Text style={styles.search}>Tìm kiếm sự kiện</Text>
          </View>
        </View>
        <View style={[styles.navigation, styles.barShadowBox]}>
          <Image
            style={styles.plusIcon}
            contentFit="cover"
            // source={require('../assets/tune-icon.png')}
          />
        </View>
      </View>
      <View style={[styles.searchBarParent, styles.eventListSpaceBlock]}>
        <View style={styles.smallTranparentButton}>
          <Text style={[styles.dummyText, styles.dummyTypo]}>Tất cả</Text>
        </View>
        <View style={[styles.smallButton, styles.smallSpaceBlock]}>
          <Text style={[styles.dummyText1, styles.dummyTypo]}>Sắp tới</Text>
        </View>
        <View style={styles.smallSpaceBlock}>
          <Text style={[styles.dummyText, styles.dummyTypo]}>Đang diễn ra</Text>
        </View>
        <View style={styles.smallSpaceBlock}>
          <Text style={[styles.dummyText, styles.dummyTypo]}>Hoàn Thành</Text>
        </View>
        <View style={styles.smallSpaceBlock}>
          <Text style={[styles.dummyText, styles.dummyTypo]}>Đã hủy</Text>
        </View>
      </View>
      <FlatList
        style={[styles.eventList, styles.eventListSpaceBlock]}
        renderItem={({ item }) => item}
        contentContainerStyle={styles.eventListFlatListContent}
      />
      <View style={[styles.bottomNavBar, styles.barShadowBox]}>
        <View style={[styles.tab1, styles.textFlexBox]}>
          <Image
            style={styles.plusIcon}
            contentFit="cover"
            // source={require('../assets/eve')}
          />
          <Text style={[styles.sKin, styles.sKinTypo]}>Sự kiện</Text>
        </View>
        <View style={[styles.tab1, styles.textFlexBox]}>
          <Image
            style={styles.plusIcon}
            contentFit="cover"
            // source={require('../assets/icon--group.png')}
          />
          <Text style={[styles.khchHng, styles.sKinTypo]}>Khách hàng</Text>
        </View>
        <View style={[styles.tab1, styles.textFlexBox]}>
          <Image
            style={styles.plusIcon}
            contentFit="cover"
            // source={require('../assets/icon--badge.png')}
          />
          <Text style={[styles.khchHng, styles.sKinTypo]}>Nhân viên</Text>
        </View>
        <View style={[styles.tab1, styles.textFlexBox]}>
          <Image
            style={styles.plusIcon}
            contentFit="cover"
            // source={require('../assets/icon--person-outline.png')}
          />
          <Text style={[styles.khchHng, styles.sKinTypo]}>Cá nhân</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventListFlatListContent: {
    flexDirection: 'column',
  },
  textFlexBox: {
    alignItems: 'center',
    flex: 1,
  },
  iconButtonSpaceBlock: {
    padding: Padding.p_xs,
    borderRadius: Border.br_xs,
    overflow: 'hidden',
  },
  eventListSpaceBlock: {
    marginTop: 16,
    alignSelf: 'stretch',
  },
  barShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
  },
  dummyTypo: {
    textAlign: 'right',
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    fontWeight: '700',
  },
  smallSpaceBlock: {
    marginLeft: 12,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sKinTypo: {
    fontSize: FontSize.size_xs,
    textAlign: 'left',
    fontWeight: '500',
    lineHeight: 20,
  },
  avatar44x44Icon: {
    borderRadius: Border.br_71xl,
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
  },
  amThHai: {
    fontSize: FontSize.body14Medium_size,
    textAlign: 'left',
    fontWeight: '500',
    lineHeight: 20,
    color: Color.neutral2,
    alignSelf: 'stretch',
  },
  ngy25112023: {
    fontSize: FontSize.size_lg,
    lineHeight: 28,
    color: Color.colorMidnightblue,
    fontWeight: '700',
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  date: {
    marginLeft: 8,
  },
  avatarAndDateItem: {
    flexDirection: 'row',
  },
  plusIcon: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  iconButton: {
    backgroundColor: Color.colorBlueviolet,
    flexDirection: 'row',
  },
  navigationWithAddButton: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  vectorIcon: {
    width: 20,
    height: 20,
  },
  search: {
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    textAlign: 'left',
    color: Color.neutral2,
    fontWeight: '500',
  },
  text: {
    marginLeft: 16,
    flexDirection: 'row',
  },
  searchBar: {
    paddingVertical: Padding.p_xs,
    elevation: 8,
    shadowRadius: 8,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: Border.br_base,
    paddingHorizontal: Padding.p_5xl,
    flex: 1,
  },
  navigation: {
    marginLeft: 10,
    elevation: 8,
    shadowRadius: 8,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    padding: Padding.p_xs,
    borderRadius: Border.br_xs,
    overflow: 'hidden',
  },
  searchBarParent: {
    flexDirection: 'row',
  },
  dummyText: {
    color: Color.neutral2,
  },
  smallTranparentButton: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dummyText1: {
    color: Color.colorWhite,
  },
  smallButton: {
    backgroundColor: Color.colorBlueviolet,
  },
  eventList: {
    flex: 1,
    marginTop: 16,
  },
  sKin: {
    color: Color.colorBlueviolet,
  },
  tab1: {
    justifyContent: 'center',
  },
  khchHng: {
    color: Color.neutral2,
  },
  bottomNavBar: {
    shadowRadius: 16,
    elevation: 16,
    height: 64,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: Border.br_base,
    marginTop: 16,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  events: {
    width: '100%',
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_5xl,
    backgroundColor: Color.colorWhite,
    alignItems: 'center',
    flex: 1,
  },
});

export default HomeScreen;
