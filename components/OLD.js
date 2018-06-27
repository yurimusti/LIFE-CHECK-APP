import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    TouchableNativeFeedback,
    ScrollView,
    Button,
    AsyncStorage,
    TextInput,
    TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { createBottomTabNavigator } from 'react-navigation';
import { Icon, PricingCard, Avatar, CheckBox } from 'react-native-elements';
import PerfilUsuario from '../components/PerfilUsuario';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class MyListItem extends React.PureComponent {
    render() {
        return (

            <View style={style.container}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }} >

                    <Text style={style.nomemedico}>{this.props.Titulo}</Text>
                </View>
                <View>

                </View>

                <Image style={style.image} source={require('../resources/pub1.jpeg')} />

                <View style={style.container_titulo}>
                    <Text style={style.texto}>{this.props.Desc}</Text>
                </View>

                <View style={{ height: 0.5, width: width, backgroundColor: "#2FA398" }}></View>



            </View>

        );
    }
}



class Listagem extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            client: '',
            uid: '',
            access_token: '',
            resource_type: '',
            data: [

            ]
        }
        AsyncStorage.getItem('client')
            .then((value) => {
                this.setState({ client: value });
                console.warn('CLIENT: ' + this.state.client);
            }).done();


        AsyncStorage.getItem('uid')
            .then((value) => {
                this.setState({ uid: value });
                console.warn('UID: ' + this.state.uid);
            }).done();


        AsyncStorage.getItem('access-token')
            .then((value) => {
                this.setState({ access_token: value });
                console.warn('ACESS: ' + this.state.access_token);
            }).done();

        AsyncStorage.getItem('resource-type')
            .then((value) => {
                this.setState({ resource_type: value });
                console.warn('TYPE: ' + this.state.resource_type);
            }).done();


    }



    componentDidMount() {

        fetch('http://ec2-18-220-242-92.us-east-2.compute.amazonaws.com:8090/api/v1/cupoms', {
            method: 'GET',
            headers: {

                'access-token': this.state.access_token,
                'client': this.state.client,
                'resource-type': this.state.resource_type,
                'uid': this.state.uid,

            },

        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    data: responseJson
                })

                console.warn(this.state.data);// your JSON response is here
            })
            .catch((error) => {
                console.log(error);
            });



    }


    render() {


        return (
            <View style={{ backgroundColor: '#f3f3f3', height: height, }}>
                <ScrollView>

                    <FlatList

                        data={this.state.data}
                        style={{ marginBottom: 100 }}



                        renderItem={({ item, index }) =>
                            <PricingCard

                                key={item.name}
                                color='#4f9deb'
                                title={item.name}
                                price={item.score}
                                info={[]}
                                button={{ title: 'RETIRAR CUPOM', icon: 'flight-takeoff' }}
                                onButtonPress={() => alert('Cupom retirado com sucesso.')}
                            />

                        }
                        keyExtractor={item => item.nome_empresa}
                    />

                </ScrollView>



            </View>
        );
    }
}

class CriarCupom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            score: '',
            body: '',
        }
    }

    _createCupom() {

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

    render() {


        return (
            <View style={{ backgroundColor: '#f3f3f3', height: height, width: width }}>

                <TextInput style={style.inputCelular} value={this.state.name} onChangeText={(text) => this.setState({ name: text })}
                    placeholder="Nome" underlineColorAndroid="#2FA398" placeholderTextColor="#000" />

                <TextInput style={style.inputCelular} value={this.state.score} onChangeText={(text) => this.setState({ score: text })}
                    placeholder="Pontuação" underlineColorAndroid="#2FA398" placeholderTextColor="#000" />

                <TextInput style={style.inputCelular} value={this.state.body} onChangeText={(text) => this.setState({ body: text })}
                    placeholder="Texto" underlineColorAndroid="#2FA398" placeholderTextColor="#000" />

                <TouchableNativeFeedback onPress={() => this._createCupom()}>
                    <View style={style.btn_Login} >

                        <Text style={{ color: '#fff' }}>CADASTRAR CUPOM</Text>
                    </View>
                </TouchableNativeFeedback>



            </View>
        );
    }
}

class Perfil extends Component {

    constructor() {
        super();
        this.state = {
            client: '',
            uid: '',
            access_token: '',
            resource_type: '',
            nomeUser: '',
            pontuacao: '50',
            data: [

                { titulo: 'Beber água', enable: true }, { titulo: 'Caminhar 5km', enable: true }, { titulo: '10 flexões', enable: false }, { titulo: 'Comer 1 fruta', enable: false }
            ]
        }

        AsyncStorage.getItem('client')
            .then((value) => {
                this.setState({ client: value });
                // console.warn('CLIENT: ' + this.state.client);
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

         

    }

    clear() {
        AsyncStorage.removeItem('client')
            .then((value) => {
                console.warn(value)
            }).done()
        AsyncStorage.removeItem('uid')
            .then((value) => {
                console.warn(value)
            }).done()
        AsyncStorage.removeItem('access-token')
            .then((value) => {
                console.warn(value)
            }).done();

        //props.navigation.navigate('Login');

    }




    componentWillMount() {

        AsyncStorage.getItem('nome')
            .then((value) => {
                this.setState({ nomeUser: value })
                console.warn(value);
            }).done();


    }

    onCheckboxPress(index) {

        console.warn(this.state.data[index].enable);

        this.state.data[index].enable = !this.state.data[index].enable

        this.setState({



        });

    }

    render() {
        return (
            <View style={style.containerPerfil}>

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
                        <Text style={style.pontuacaoPessoa}>Pontos: {this.state.pontuacao}</Text>
                    </View>
                    <View>

                        <Button title="Sair" onPress={this.clear} />

                    </View>

                </View>
                <View style={{ width: width, height: 4, backgroundColor: "#2FA398", }}></View>

                <ScrollView >

                    <FlatList


                        data={this.state.data}


                        renderItem={({ item, index }) =>
                            <CheckBox

                                title={item.titulo}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={item.enable}
                            />

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

class CriarPublicacao extends Component {

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




    _createPublicacao() {

        fetch('http://ec2-18-220-242-92.us-east-2.compute.amazonaws.com:8090/api/v1/publications', {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',

            },
            body: JSON.stringify({

                title: this.state.title,
                description: this.state.description,
                image: null

            }),
        })
            .then((response) => {
                response.json().then((data) => {

                    if (data.errors == null) {

                        console.warn(response);

                        alert('Publicação cadastrada com sucesso.');


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

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
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

                let source = { url: response.data };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({

                    image: source

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
                            <Image style={{ width: width, height: 200 }} source={this.state.image.url} />

                        }

                    </View>

                </TouchableOpacity>

                <TextInput style={style.inputCelular} value={this.state.title} onChangeText={(text) => this.setState({ title: text })}
                    placeholder="Titulo" underlineColorAndroid="#2FA398" placeholderTextColor="#000" />

                <TextInput style={style.inputCelular} value={this.state.description} onChangeText={(text) => this.setState({ description: text })}
                    placeholder="Descrição" underlineColorAndroid="#2FA398" placeholderTextColor="#000" />




                <TouchableNativeFeedback onPress={() => this._createPublicacao()}>
                    <View style={style.btn_Login} >

                        <Text style={{ color: "#fff" }}>CADASTRAR PUBLICAÇÃO</Text>
                    </View>
                </TouchableNativeFeedback>


            </View>
        );
    }
}


export default createBottomTabNavigator(
    {
        Teste1: {
            screen: Noticias,
            navigationOptions: {
                swipeEnabled: false,
                lazy: true,
                tabBarLabel: ' ',
                tabBarIcon: ({ tintColor }) => (<Icon name='globe' type='font-awesome' size={25} color={tintColor} />)

            },
        },

        Teste2: {
            screen: CriarCupom,
            navigationOptions: {
                swipeEnabled: false,
                lazy: true,
                tabBarLabel: ' ',
                tabBarIcon: ({ tintColor }) => (<Icon name='cart-plus' type='font-awesome' size={25} color={tintColor} />)

            },
        },

        Teste5: {
            screen: CriarPublicacao,
            navigationOptions: {
                swipeEnabled: false,
                lazy: true,
                tabBarLabel: ' ',
                tabBarIcon: ({ tintColor }) => (<Icon name='plus' type='font-awesome' size={25} color={tintColor} />)

            },
        },

        Teste3: {
            screen: Listagem,
            navigationOptions: {
                swipeEnabled: false,
                lazy: true,
                tabBarLabel: ' ',
                tabBarIcon: ({ tintColor }) => (<Icon name='list' type='font-awesome' size={25} color={tintColor} />)

            },
        },

        Teste4: {
            screen: Perfil,
            navigationOptions: {
                swipeEnabled: false,
                lazy: true,
                tabBarLabel: ' ',
                tabBarIcon: ({ tintColor }) => (<Icon name='user' type='font-awesome' size={25} color={tintColor} />)

            },
        },

    },
    {


        tabBarOptions: {
            swipeEnabled: false,
            showLabel: false,
            activeTintColor: '#2FA398',
            inactiveTintColor: '#3a393e',
            style: { backgroundColor: '#f3f3f3', marginTop: 0, },
            showIcon: true,
            indicatorStyle: { backgroundColor: '#2FA398' },
            pressColor: '#ccc',

        },
    }

);


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
    btn_Login: {
        top: 30,
        width: width,
        height: 50,
        backgroundColor: '#2FA398',
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center',




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
