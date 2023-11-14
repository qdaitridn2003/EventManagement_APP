import { StyleSheet, Text, View, Image, Button, Pressable, FlatList, ScrollView } from 'react-native'
import {useContext} from 'react'
import {Padding, Color, FontSize, Border, FontFamily} from '../../components/styles/GlobalStyles' 

import { AppContext } from '../../contexts/AppContext'
import ItemListEvent from './ItemListEvent'

const dumyDataEvent = [
  {
    id: 1,
    name: 'Khai trương',
    startDay: '01/01/2023',
    endDay: '01/02/2023',
    progress: '50%'
  },
  {
    id: 2,
    name: 'Đám cưới',
    startDay: '01/03/2023',
    endDay: '01/04/2023',
    progress: '50%'
  },
  {
    id: 3,
    name: 'Happy Bee 12',
    startDay: '03/03/2023',
    endDay: '04/04/2023',
    progress: '50%'
  },
  {
    id: 4,
    name: 'Happy Bee 12',
    startDay: '03/03/2023',
    endDay: '04/04/2023',
    progress: '50%'
  }
]

const EventScreen = (props) => {
  return (
      <View style={styles.container}>
        <View style={styles.nameScreenAndBtnAdd}>
          <View style={styles.textFlexBox}>
            <Text style={styles.dashboard}>Sự kiện</Text>
            <Image
              style={styles.logoEvent}
              source={require("../../assets/icon--event2.png")}
            />
          </View>
          <Image
            style={styles.buttonFab}
            source={require("../../assets/plus-icon.png")}
          />
        </View>

        <View style={styles.searchEvent}>
          <Image
            style={styles.imageSearch}
            source={require("../../assets/vector.png")}
          />
          <View style={[styles.text, styles.inputSearch]}>
            <Text style={[styles.search, styles.text1Clr]}>Tìm kiếm sự kiện</Text>
          </View>
          <Image
            style={[styles.vectorIcon1, styles.imageTune]}
            source={require("../../assets/tune-icon.png")}
          />
        </View>

        <View style={styles.containerTabBar}>
          <View style={styles.tabBar}>
            <View style={styles.tabAll}>
              <Text onClick style={styles.btnTabAll}>Tất cả</Text>
            </View>
            <View style={styles.tabBarCompleted}>
              <Text style={styles.btnCompleted}>Hoàn thành</Text>
            </View>
            <View style={styles.tabUncompleted}>
              <Text style={styles.btnUnCompleted}>Chưa</Text>
            </View>
          </View>
        </View>
        <ScrollView style={{height: '100%', width: '100%'}}>
          <FlatList 
              data={dumyDataEvent}
              renderItem={({item}) => <ItemListEvent data={item}/>}
              keyExtractor={item => item.id}
            />
        </ScrollView>
      



      </View>
  )
}

export default EventScreen

const styles = StyleSheet.create({
  container:{
    width: "100%",
    height: 812,
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_5xl,
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.colorWhite
  },
  nameScreenAndBtnAdd:{
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  textFlexBox:{
    flexDirection: "row",
    alignItems: "center",
  },
  dashboard:{
    fontSize: FontSize.title24Bold_size,
    lineHeight: 29,
    textAlign: "left",
    color: Color.colorMidnightblue,
    fontWeight: "700",
  },
  logoEvent:{
    marginLeft: 8,
    height: 24,
    width: 24,
  },
  buttonFab:{
    width: 44,
    height: 44,
    overflow: "hidden",
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorBlueviolet,
  },
  searchEvent:{
    height: 48,
    paddingVertical: 0,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Padding.p_5xl,
    borderRadius: Border.br_base,
    alignSelf: "stretch",
    backgroundColor: Color.colorWhite,
    elevation: 10,
    shadowColor: Color.colorBlack,
    shadowOffset: { width: 0, height: 100 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  imageSearch:{
    height: 20,
    width: 20,
  },
  imageTune:{
    height: 20,
    width: 20,
    marginLeft: 16,
  },
  inputSearch:{
    marginLeft: 16,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  containerTabBar:{
    width: 313,
    height: 40,
    marginTop: 16,
  },
  tabBar:{
    left: 0,
    top: 0,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  tabAll:{
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    alignItems: "center",
  },
  btnTabAll:{
    fontWeight: "500",
    color: Color.neutral4,
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    fontFamily: FontFamily.title24Bold,
    color: Color.neutral4,
    textAlign: "left",
  },
  tabBarCompleted:{
    backgroundColor: Color.colorBlueviolet,
    marginLeft: 16,
    borderRadius: Border.br_xs,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    alignItems: "center",
  },
  btnCompleted:{
    textAlign: "right",
    color: Color.colorWhite,
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    fontFamily: FontFamily.headlines16Medium,
    fontWeight: "700",
  },
  tabUncompleted:{
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  btnUnCompleted:{
    fontWeight: "500",
    color: Color.neutral4,
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    fontFamily: FontFamily.title24Bold,
    color: Color.neutral4,
    textAlign: "left",
  },
  
  
  
})
