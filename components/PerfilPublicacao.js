import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableNativeFeedback,
  NativeModules

} from 'react-native';
//import Icon from '@expo/vector-icons/MaterialCommunityIcons';
const { StatusBarManager } = NativeModules;
import { Icon } from 'react-native-elements';



export default class Perfil extends React.PureComponent {
  render() {


    return (

      <View style={style.container}>





        <View style={style.container_titulo}>


          <View style={style.quadrado}></View>
          <Text style={style.titulo}>Titulo publicação</Text>

          <View style={{ alignItems: 'center',  }}>
            <View style={{
              width: width,
              alignSelf: 'flex-end',
        

            }}>
              <Icon

                name='phone'
                type='font-awesome'
                color='#2FA398'
                
                onPress={() => console.log('hello')} />
            </View>
          </View>


        </View>
        <View>
          <Image style={style.fotoPerfil}
            source={require('../resources/pub1.jpeg')} />

        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ fontStyle: 'italic', fontWeight: '400' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</Text>
        </View>




      </View>

    );
  }
}





const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const style = StyleSheet.create({

  container: {
    marginTop: StatusBarManager.HEIGHT + 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 15,
    borderBottomColor: "#2FA398",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    backgroundColor: "#fff"
  },
  container_titulo: {
    width: width,

    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
   
  },
  fotoPerfil: {

    height: 300,


  },
  titulo: {
    marginTop: 2,
    fontWeight: 'bold',
    fontSize: 18,
  },
  quadrado: {
    height: 10,
    width: 5,

    backgroundColor: "#2FA398",
    alignContent: 'center',
    margin: 10
  }



});
