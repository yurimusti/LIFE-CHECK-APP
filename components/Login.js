import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView ,
  TouchableNativeFeedback,
  Button,
  AsyncStorage

} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);







export default class TelaLogin extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      auth: '',
      password: '',
      access_token:null,
    }

  }

 
  componentWillMount(){



        AsyncStorage.getItem('access-token')
            .then((value) => {

                if(value === null){
                 
               console.warn(value);
               
               
                }else{
                  this.setState({ access_token: value });
                  console.warn(value);
                  Actions.tabbar();
                }
                
            }).done();

     



}
 
   

  

  _onLogin() {




    fetch('http://ec2-18-220-242-92.us-east-2.compute.amazonaws.com:8090/api/v1/users/auth/sign_in', {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //  auth: 'yuri33@hotmail.com',
        //  password: 'tete123',

       auth: this.state.auth,
     password: this.state.password,

      }),
    })
      .then((response) => {
        response.json().then((data) => {

          if (data.errors == null) {

            //auth
            AsyncStorage.setItem('client', response.headers.get('client'));
            AsyncStorage.setItem('access-token', response.headers.get('access-token'));
            AsyncStorage.setItem('uid', response.headers.get('uid'));
            AsyncStorage.setItem('resource-type', response.headers.get('resource-type'))
            
            //user
            AsyncStorage.setItem('nome', data.name);
            //AsyncStorage.setItem('isAdmin',data.isAdmin);

           //console.warn(data);
            

            Actions.tabbar();

   



          } else {
            alert('Email ou senha incorreto')

          }


        })
          .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
          });
      })
      .catch((error) => {
        alert('Verifique sua conexão.');
      })


  }

  render() {
    return (
<View style={{backgroundColor:'#000000', height:height}}>
      <ImageBackground style={{flex: 1, backgroundColor:'#ff000055'}} source={require('../resources/bg.jpg')}>
      <View  style={{ height: height, }}>



          <View style={style.Logocenter}>
            <Image style={{width:width, height: 250}} source={require('../resources/logo_lifecheck2.png')} />
          </View>

          <View style={{ flex: 3.0}}>
            <KeyboardAvoidingView behavior="padding" >

           
              <TextInput style={style.inputCelular} keyboardType={'email-address'} value={this.state.email} onChangeText={(text) => this.setState({ auth: text })}
                placeholder="Endereço de Email" underlineColorAndroid="#ffd932" placeholderTextColor="#2FA398" />
              <TextInput style={style.inputCelular} secureTextEntry value={this.state.password} onChangeText={(text) => this.setState({ password: text })} 
                placeholder="Senha" underlineColorAndroid="#ffd932" placeholderTextColor="#2FA398" />
               
              <View style={{ alignItems: 'center' }}>

                <TouchableNativeFeedback onPress={() => this._onLogin()}>
                  <View style={style.btn_Login} >

                    <Text style={style.text_Login}>Entrar</Text>
                  </View>
                </TouchableNativeFeedback>

              </View>

              <TouchableNativeFeedback onPress={() => Actions.cadastro()}>
                <View style={style.btn_Cadastro}>
                  <Text style={style.text_cadastro}>Ainda não tem uma conta? </Text><Text style={style.text_cadastro_bold}>Cadastre-se aqui</Text>
                </View>

              </TouchableNativeFeedback>
             
            </KeyboardAvoidingView>
          </View>




      </View>
      </ImageBackground>
      </View>

    );
  }


}



const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const style = StyleSheet.create({

  Logocenter: {

    justifyContent: "center",
    flex:3


  },

  LogocustomFont: {


    color: "#fdfdfc",
    fontSize: 110,
    textShadowColor: 'rgba(100, 0, 0, 0.45)',
    textShadowOffset: { width: 1, height: 5 },
    textShadowRadius: 10,
    textAlign: "center"


  },
  container: {
    top: height / 2.4,
    width: "100%",
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',




  },
  form: {

    height:height,
    width: width,

    paddingTop: 30,








  },

  inputCelular: {
    fontFamily: 'Roboto',
    marginLeft: 50,
    marginRight: 50,
 
    fontSize: 19,
    paddingBottom: 10,
    paddingLeft: 2,
    color: "#2FA398",
    marginBottom: 10,


  },
  btn_Login: {
    top: 30,
    width: width / 2,
    height: 50,
    backgroundColor: '#2FA398',
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 200,



  },
  text_Login: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 19,
    color: "#fff",
    fontFamily: 'Roboto',
  },

  btn_Cadastro: {
    
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'center',




  },
  text_cadastro: {
    fontFamily: 'Roboto',
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    

    color: "#2FA398",
    paddingBottom: 30,

  },
  text_cadastro_bold: {
    fontFamily: 'Roboto',
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    

    color: "#2FA398",
    paddingBottom: 30,
    fontWeight:'bold'

  }

});
