import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableNativeFeedback,
    Text,
    Dimensions,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import {
    PricingCard
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class CriarCupom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            score: '',
            body: '',
        }
    }

    _createCupom() {


        if (this.state.name == '' ||
            this.state.score == ''){
            
            alert('Por favor, insira todos os campos para continuar');
        } else {



            fetch('http://ec2-18-220-242-92.us-east-2.compute.amazonaws.com:8090/api/v1/cupoms', {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    name: this.state.name,
                    score: this.state.score,
                    body: this.state.body

                }),
            })
                .then((response) => {
                    response.json().then((data) => {

                        if (data.errors == null) {

                            alert('Cupom criado com sucesso.');
                            console.warn(response);
                            Actions.listcupom();




                        } else {
                            alert(data.errors)

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

    }

    render() {


        return (
            <View style={{ backgroundColor: '#f3f3f3', flex: 1 }}>



                <View flex={1.8} style={{ marginTop: 0 }}>

                    <PricingCard


                        color='#4f9deb'
                        title={this.state.name == '' ? 'Nome' : this.state.name}
                        price={this.state.name == '' ? 'Pontos' : this.state.score}
                        

                        info={[]}
                        button={{ title: 'RETIRAR CUPOM', icon: 'flight-takeoff' }}
                     
                    />

                </View>


                <View flex={1.}>
                    <TextInput style={style.inputCelular} value={this.state.name} onChangeText={(text) => this.setState({ name: text })}
                        placeholder="Nome" underlineColorAndroid="#2FA398" placeholderTextColor="#000" />

                    <TextInput style={style.inputCelular} value={this.state.score} onChangeText={(text) => this.setState({ score: text })}
                        placeholder="Pontuação" underlineColorAndroid="#2FA398" placeholderTextColor="#000" />

                </View>
                <View flex={.7}>
               

                        <View style={{ alignItems: 'center' }}>
                            <TouchableNativeFeedback onPress={() => this._createCupom()}>
                                <View style={style.btn_Cadastra} >

                                    <Text style={{ color: "#fff", fontWeight: 'bold' }}>CADASTRAR CUPOM</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                   
                </View>





            </View>
        );
    }
}

const style = StyleSheet.create({

    container: {

        marginBottom: 0,
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        borderTopWidth: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopColor: "#2FA398",

        backgroundColor: "#f8f8f8"
    },
    container_titulo: {
        margin: 10,

    },
    texto: {
        fontSize: 13,


    },
    image: {
        height: 300,
        width: width,

    },
    nomemedico: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 15
    },
    button: {


        padding: 12,

    },
    txt_button: {
        color: "#2FA398",
        fontWeight: 'bold'
    },
    space: {
        width: 50

    },
    inputCelular: {
        marginLeft: 50,
        marginRight: 50,
        fontWeight: 'bold',
        fontSize: 19,
        paddingBottom: 10,
        paddingLeft: 2,
        color: "#000000",


    },
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
        height: 280,
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

    containerPerfil: {

        backgroundColor: "#fff",
        height: height
    },



});
