import React from 'react';
import { Text, StyleSheet, Image, View, Color } from 'react-native';


const CustomerScreen = () => {
  return (
    <View>
      <View style={styles.CustomerScreen}>
        <View style={styles.navigation}>
          <View style={styles.textFlexBox}>
            <Text style={styles.khchHng}>Khách hàng</Text>
            <Image
              style={[styles.iconGroup2, styles.iconLayout]}
              resizeMode="cover"
              source="../assets/icons8-customer-50.png"
            />
          </View>

          <Image
            style={styles.buttonFab}
            resizeMode="cover"
            source="../assets/add-employee-button3x.png"
          />
        </View>
        <View style={styles.searchBar}>
          <Image style={styles.vectorIconLayout} resizeMode="cover" source="../assets/" />
          <View style={[styles.text, styles.textFlexBox]}>
            <Text style={styles.search}>Tìm kiếm khách hàng</Text>
            <Image
              style={[styles.vectorIcon3, styles.vectorIconLayout]}
              resizeMode="cover"
              source="Vector.png"
            />
          </View>
          <View style={styles.eventList}>
            <View style={styles.cardShadowBox}>
              <Image
                style={styles.avatarOffline5}
                resizeMode="cover"
                source="Avatar / Offline.png"
              />
            </View>
          </View>
        </View>
        <Image
          style={[styles.vectorIcon3, styles.vectorIconLayout]}
          resizeMode="cover"
          source="Vector.png"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  iconLayout: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  textFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vectorIconLayout: {
    height: 20,
    width: 20,
  },
  tab1FlexBox: {
    justifyContent: 'center',
    flex: 1,
  },
  sKinTypo: {
    lineHeight: 20,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'left',
  },
  cardShadowBox: {
    padding: 16,
    width: 32,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  khchHng: {
    fontSize: 24,
    lineHeight: 29,
    textAlign: 'left',
    color: '#1c1243',
    fontWeight: '700',
  },
  iconGroup2: {
    marginLeft: 8,
    overflow: 'hidden',
  },
  buttonFab: {
    borderRadius: 12,
    width: 44,
    height: 44,
    overflow: 'hidden',
  },
  navigation: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  search: {
    color: '#a29eb6',
    fontWeight: '500',
    lineHeight: 24,
    fontSize: 16,
    textAlign: 'left',
  },
  text: {
    marginLeft: 16,
    flex: 1,
    flexDirection: 'row',
  },
  vectorIcon3: {
    marginLeft: 16,
  },
  searchBar: {
    paddingVertical: 0,
    marginTop: 16,
    height: 48,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 16,
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatarOffline5: {
    width: 48,
    height: 48,
  },
  hoiThng: {
    lineHeight: 24,
    fontSize: 16,
    textAlign: 'left',
    color: '#1c1243',
    fontWeight: '700',
  },
  gimCCng5: {
    marginTop: 4,
    color: '#a29eb6',
  },
  nameBadge: {
    marginLeft: 22,
  },
  card1: {
    marginTop: 16,
  },
  card2: {
    marginTop: 16,
  },
  card3: {
    marginTop: 16,
  },
  card4: {
    marginTop: 16,
  },
  eventList: {
    marginTop: 16,
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1,
  },
  iconEvent1: {
    overflow: 'hidden',
  },
  sKin: {
    color: '#a29eb6',
  },
  tab1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  khchHng1: {
    color: '#643fdb',
  },
  bottomNavBar1: {
    shadowRadius: 16,
    elevation: 16,
    height: 64,
    width: 327,
    marginTop: 16,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  clients: {
    width: '100%',
    justifyContent: 'space-between',
  },
});
export default CustomerScreen;
