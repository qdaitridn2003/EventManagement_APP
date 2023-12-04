import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import DummyDataNotifications from './Notifications/DummyDataNotifications';
import { Border, Color, FontSize } from '../components/styles/GlobalStyles';

const ToolbarNotification = () => {
  return (
    <View style={styles.nameScreenAndBtnAdd}>
      <View style={styles.textFlexBox}>
        <Text style={styles.dashboard}>Thông báo</Text>
        <Image style={styles.logoEvent} source={require('../assets/notifications.png')} />
      </View>
      <TouchableOpacity>
        <Image style={styles.buttonFab} source={require('../assets/icon--more-vert3.png')} />
      </TouchableOpacity>
    </View>
  );
};

const FilterNotification = () => {
  return (
    <View style={styles.selectNotification}>
      <TouchableOpacity style={styles.textFlexBox}>
        <Image tyle={styles.dashboard} source={require('../assets/check-circle.png')} />
        <Text style={{ color: '#C0C0C0' }}>Đánh dấu đã đọc</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textFlexBox}>
        <Image source={require('../assets/delete.png')} />
        <Text style={{ color: Color.overlayRed }}>Đánh dấu đã đọc</Text>
      </TouchableOpacity>
    </View>
  );
};

const NotificationsListItem = ({ data }) => {
  return (
    <View style={styles.notificationsContainer}>
      <Image style={styles.notificationsAvatar} source={require('../assets/avatar-28x2813x.png')} />
      <View style={styles.notificationsInfo}>
        <Text style={styles.notificationsName}>{data.name}</Text>
        <Text style={styles.notificationsRole}>{data.details}</Text>
      </View>
    </View>
  );
};

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <ToolbarNotification />
      <FilterNotification />

      <FlatList
        data={DummyDataNotifications}
        renderItem={({ item }) => <NotificationsListItem data={item} />}
        keyExtractor={(item) => item.id}
        style={{ height: '100%', width: '100%' }}
        showsVerticalScrollIndicator={false}
      />
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
  nameScreenAndBtnAdd: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  selectNotification: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 32,
    marginBottom: 16,
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
    width: 44,
    height: 44,
    overflow: 'hidden',
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorBlueviolet,
  },
  notificationsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationsAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  notificationsInfo: {
    flex: 1,
  },
  notificationsName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationsRole: {
    color: '#888',
  },
});

export default NotificationScreen;
