import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
    View, TouchableOpacity, Image, TextInput, TouchableNativeFeedback, Dimensions, Text, StyleSheet
} from 'react-native';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class CriarPublicacao extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            description: '',
            user: '',
            image: {
                url: null
            },


        }
    }




    _createPublicacao(source) {

        if (source == null) {
            alert('Por favor, selecione uma foto.')
        } else {

            if (this.state.title == '' || this.state.description == '') {
                alert('Por favor, insira todos os campos para continuar')
            } else {



                let photo = { uri: source.uri }
                let formdata = new FormData();

                formdata.append("title", this.state.title)
                formdata.append("description", this.state.description)
                formdata.append("image", { uri: photo.uri, name: 'image.jpg', type: 'multipart/form-data' })



                fetch('http://ec2-18-220-242-92.us-east-2.compute.amazonaws.com:8090/api/v1/publications', {
                    method: 'POST',
                    headers: new Headers({

                        'Content-Type': 'multipart/form-data',


                    }),
                    body: formdata



                })
                    .then((response) => {
                        response.json().then((data) => {

                            if (data.errors == null) {

                                console.warn(data);

                                alert('Publicação cadastrada com sucesso.');

                                Actions.notices();



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
                        console.warn(error);

                    })
            }
        }

    }

    selectPhotoTapped() {
        const options = {
            rotation: 90,
            quality: 1.0,
            maxWidth: 800,
            maxHeight: 600,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.warn('Response = ', response);

            if (response.didCancel) {
                console.warn('User cancelled photo picker');
            }
            else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.lowarng('User tapped custom button: ', response.customButton);
            }
            else {

                console.warn(response.path);

                //let source = { url: response.origURL };

                // You can also display the image using data:
                let source = { uri: response.uri };

                this.setState({

                    image: source,
                    response: response

                });
            }


        });
    }

    render() {


        return (
            <View style={{ backgroundColor: '#f3f3f3', height: height }}>


                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

                    <View style={{
                        borderRadius: 10,
                        width: width,
                        height: 300,
                        borderColor: '#9B9B9B',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>

                        {this.state.image.url === null ? <Text>Selecione uma foto</Text> :
                            <Image style={{ width: width, height: 500 }} source={this.state.image} />

                        }

                    </View>

                </TouchableOpacity>

                <TextInput style={style.inputCelular} value={this.state.title} onChangeText={(text) => this.setState({ title: text })}
                    placeholder="Titulo" underlineColorAndroid="#2FA398" placeholderTextColor="#000" />

                <TextInput style={style.inputCelular} value={this.state.description} onChangeText={(text) => this.setState({ description: text })}
                    placeholder="Descrição" underlineColorAndroid="#2FA398" placeholderTextColor="#000" />



                <View style={{ alignItems: 'center' }}>
                    <TouchableNativeFeedback onPress={() => this._createPublicacao(this.state.response)}>
                        <View style={style.btn_Cadastra} >

                            <Text style={{ color: "#fff" }}>CADASTRAR PUBLICAÇÃO</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

            </View>
        );
    }
}

const style = StyleSheet.create({

    container: {
        top: 150,
        width: "100%",
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',


    },
    form: {
        padding: 10,
        width: width,


    },

    inputCelular: {
        marginLeft: 50,
        marginRight: 50,
        fontWeight: 'bold',
        fontSize: 19,
        paddingBottom: 10,
        paddingLeft: 2,
        color: "#000000",
        marginTop: 20,


    },
    LogocustomFont: {

        marginTop: 20,
        color: "#000000",
        fontSize: 80,
        textAlign: "center"


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
    text_Cadastrar: {
        textAlign: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 18,
        color: "#fff"
    }



});
