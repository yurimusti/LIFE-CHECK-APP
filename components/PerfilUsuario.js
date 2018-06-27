import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  NativeModules,
  ScrollView, FlatList,
  AsyncStorage,
  CheckBox,
  TouchableNativeFeedback
} from 'react-native';
//import Icon from '@expo/vector-icons/MaterialCommunityIcons';
const { StatusBarManager } = NativeModules;
import {
  Icon, Avatar, Badge, PricingCard, Overlay, Button
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';



export default class Perfil extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      client: '',
      uid: '',
      access_token: '',
      resource_type: '',
      nomeUser: '',
      score: 50,
      data: [

        { titulo: 'Beber água', enable: false, score: 10 }, { titulo: 'Caminhar 5km', enable: false, score: 10 }, { titulo: '10 flexões', enable: false, score: 10 }, { titulo: 'Comer 1 fruta', enable: false, score: 10 }
      ]
    }


  }


  componentWillMount() {

    AsyncStorage.getItem('client')
      .then((value) => {
        this.setState({ client: value });
        //console.warn('CLIENT: ' + this.state.client);
      }).done();


    AsyncStorage.getItem('uid')
      .then((value) => {
        this.setState({ uid: value });
        //console.warn('UID: ' + this.state.uid);
      }).done();


    AsyncStorage.getItem('access-token')
      .then((value) => {
        this.setState({ access_token: value });
        //console.warn('ACESS: ' + this.state.access_token);
      }).done();

    AsyncStorage.getItem('resource-type')
      .then((value) => {
        this.setState({ resource_type: value });
        //console.warn('TYPE: ' + this.state.resource_type);
      }).done();

    AsyncStorage.getItem('nome')
      .then((value) => {
        this.setState({ nomeUser: value });
        //console.warn('NOME: ' + this.state.nomeUser);
      }).done();

    //  fetch('http://ec2-18-220-242-92.us-east-2.compute.amazonaws.com:8090/api/v1/check_ativides', {
    //   method: 'GET',
    //   headers: {

    //     'Content-Type': 'application/json',


    //     'access-token': this.state.access_token,
    //     'client': this.state.client,
    //     'resource-type':this.state.resource_type,
    //     'uid': this.state.uid

    //   },

    // })
    //   .then((response) => {
    //     response.json().then((data) => {

    //       if (data.errors == null) {



    //         console.warn(data);







    //       } else {
    //         alert('Email ou senha incorreto')

    //       }


    //     })
    //       .catch(function (error) {
    //         console.log('There has been a problem with your fetch operation: ' + error.message);
    //         // ADD THIS THROW error
    //         throw error;
    //       });
    //   })
    //   .catch((error) => {
    //     alert('Verifique sua conexão.');
    //   })



  }

  _onLogout() {
    AsyncStorage.removeItem('client')
      .then((value) => {
        //console.warn(value)
      }).done()
    AsyncStorage.removeItem('uid')
      .then((value) => {
        //console.warn(value)
      }).done()
    AsyncStorage.removeItem('access-token')
      .then((value) => {
        // console.warn(value)
      }).done();
    AsyncStorage.removeItem('resource-type')
      .then((value) => {
        // console.warn(value)
      }).done();




    Actions.login();

  }



  render() {



    return (



      <View style={style.container}>

        <View style={style.containerPhoto}>
          <Avatar
            xlarge
            rounded
            source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <View>
            <Text style={style.nomePessoa}>{this.state.nomeUser}</Text>
          </View>
          <View>
            <Text style={style.pontuacaoPessoa}>Pontos: {this.state.score == null ? '0' : this.state.score}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>

            <TouchableNativeFeedback onPress={() => this._onLogout()}>
              <View style={style.btn_Cadastra} >

                <Text style={style.text_Login}>SAIR</Text>
              </View>
            </TouchableNativeFeedback>

          </View>


        </View>
        <View style={{ width: width, height: 4, backgroundColor: "#2FA398", }}></View>

        <ScrollView >

          <FlatList


            data={this.state.data}


            renderItem={({ item, index }) =>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                <CheckBox

                  value={item.enable}
                  onChange={() => this.setState({
                    score: this.state.score + item.score
                  })}
                />

                <Text>{this.state.data[index].titulo}</Text>
              </View>
            }
            keyExtractor={item => item.titulo}
          />

        </ScrollView>

        <View>

          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <View style={style.quadrado}></View>
            <Text></Text>

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={style.quadrado}></View>
            <Text>Idade</Text>

          </View>
        </View>


      </View>

    );
  }
}





const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const style = StyleSheet.create({

  container: {

    backgroundColor: "#fff",
    height: height
  },
  nomePessoa: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 22,
  },
  pontuacaoPessoa: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 17,
  },
  containerPhoto: {
    alignItems: 'center',
    height: 300,
    paddingTop: 20,

    backgroundColor: "#f3f3f3"
  },
  quadrado: {
    height: 10,
    width: 5,
    backgroundColor: "#2FA398",
    alignContent: 'center',
    margin: 10
  },
  italic: {
    fontStyle: 'italic',
    fontSize: 16
  },
  btn_Cadastra: {

    top: 10,
    width: width / 3,
    height: 40,
    backgroundColor: '#2FA398',
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    marginBottom: 10,

  },
  text_Login:{
    color:'#fff',
    fontWeight:'bold'
  }


});
