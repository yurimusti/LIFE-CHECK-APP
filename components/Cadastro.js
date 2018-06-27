import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    TouchableNativeFeedback,
    Button,
    

} from 'react-native';

import { Actions } from 'react-native-router-flux'; // Version can be specified in package.json





export default class Cadastro extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            enable: false,

            name: '',
            email: '',
            password: '',
            age: '',
            contact: '',
            weight: '',
            height: '',

        }

    }

    _onCadastro() {

        if (this.state.email == '' || this.state.name == '' || this.state.password == ''
            || this.state.age == '' || this.state.contact == '' || this.state.weight == ''
            || this.state.height == '') {

           alert('Por favor, insira todas as informações para continuar.');


        } else {





            fetch('http://ec2-18-220-242-92.us-east-2.compute.amazonaws.com:8090/api/v1/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name,
                    contact: this.state.contact,
                    age: this.state.age,
                    weight: this.state.weight,
                    heigth: this.state.height,
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.errors == null) {

                        alert('Conta registrada com sucesso.')

                        Actions.login();





                    } else {

                        alert('Por favor, insira um email e uma senha')
                        console.warn(responseJson.errors)

                        //this.props.navigator.navigate('Login');

                    }

                })
                .catch((error) => {
                    alert('');
                })


        }


    }


    render() {



        return (

            <ImageBackground style={{flex: 1, backgroundColor:'#ff000055'}} source={require('../resources/bg.jpg')}>

            <View style={{ flex: 1, flexDirection: 'column', height: height }}>


                <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 66, color: "#2FA398", fontFamily:'Roboto' }}>Cadastro</Text>
                </View>

                <View style={{ flex: 6 }}>
                    <View style={{ marginLeft: 15, marginRight: 15 }}>
                        <TextInput style={style.inputCelular} onChangeText={(text) => this.setState({ nome: text })}
                            placeholder="Nome completo" underlineColorAndroid="#ffd932" placeholderTextColor="#2FA398" />
                       
                        <TextInput style={style.inputCelular} onChangeText={(text) => this.setState({ email: text })}
                            placeholder="Email"  keyboardType={'email-address'} underlineColorAndroid="#ffd932" placeholderTextColor="#2FA398" />
                       
                        <TextInput style={style.inputCelular} onChangeText={(text) => this.setState({ password: text })}
                            placeholder="Senha" secureTextEntry underlineColorAndroid="#ffd932" placeholderTextColor="#2FA398" />
                      
                        <TextInput style={style.inputCelular} onChangeText={(text) => this.setState({ contact: text })}
                            placeholder="Contato" underlineColorAndroid="#ffd932" placeholderTextColor="#2FA398" />
                      
                        <TextInput style={style.inputCelular} onChangeText={(text) => this.setState({ age: text })}
                            placeholder="Idade" keyboardType={'numeric'} underlineColorAndroid="#ffd932" placeholderTextColor="#2FA398" />
                      
                        <TextInput style={style.inputCelular} onChangeText={(text) => this.setState({ height: text })}
                            placeholder="Altura" keyboardType={'numeric'} underlineColorAndroid="#ffd932" placeholderTextColor="#2FA398" />
                       
                        <TextInput style={style.inputCelular} onChangeText={(text) => this.setState({ weight: text })}
                            placeholder="Peso" keyboardType={'numeric'} underlineColorAndroid="#ffd932" placeholderTextColor="#2FA398" />
                       

                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>

                        <TouchableNativeFeedback onPress={this._onCadastro.bind(this)} style={{ marginTop: 20 }} >
                            <View style={style.btn_Cadastra}>
                                <Text style={{ color: "#fff", fontWeight: 'bold' }}>CADASTRAR</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>


                </View>




            </View>
            </ImageBackground>

        );
    }



}


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const style = StyleSheet.create({



    btn_Cadastra: {
        top: 10,
        width: width / 2,
        height: 50,
        backgroundColor: '#2FA398',
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
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





});
