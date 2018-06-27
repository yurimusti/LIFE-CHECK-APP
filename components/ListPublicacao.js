
import React, { Component } from 'react';
import {
    AsyncStorage,
    FlatList,
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';




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

                <Image style={style.image} source={{ uri: 'http://ec2-18-220-242-92.us-east-2.compute.amazonaws.com:8090' + this.props.image.url }} onPress={console.warn('http://ec2-18-220-242-92.us-east-2.compute.amazonaws.com:8090' + this.props.image.url)} />

                <View style={style.container_titulo}>
                    <Text style={style.texto}>{this.props.Desc}</Text>
                </View>

                <View style={{ height: 0.5, width: width, backgroundColor: "#2FA398" }}></View>



            </View>

        );
    }
}

export default class ListPublicacao extends Component {
    static navigationOptions = {

        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            client: '',
            uid: '',
            access_token: '',
            resource_type: '',
            data: [

            ]
        };
    }



    componentWillMount() {



        AsyncStorage.getItem('client')
            .then((value) => {
                this.setState({ client: value });
                //console.warn(this.state.client);
            }).done();


        AsyncStorage.getItem('uid')
            .then((value) => {
                this.setState({ uid: value });
                //console.warn(this.state.uid);
            }).done();


        AsyncStorage.getItem('access-token')
            .then((value) => {
                this.setState({ access_token: value });
                //console.warn(this.state.access_token);
            }).done();

        AsyncStorage.getItem('resource-type')
            .then((value) => {
                this.setState({ resource_type: value });
                //console.warn(this.state.resource_type);
            }).done();




        fetch('http://ec2-18-220-242-92.us-east-2.compute.amazonaws.com:8090/api/v1/publications', {
            method: 'GET',
            headers: new Headers({
                'access-token': this.state.access_token,
                'client': this.state.client,
                'uid': this.state.uid,
                'resource-type': this.state.resource_type
            }),

        })
            .then((response) => response.json())
            .then((responseData) => {

                this.setState({
                    data: responseData
                })
                console.warn(responseData);

            })
            .done();


    }


    render() {


        //this.clear();
        return (

            <View style={{flex:1}}>
                
                    <ActionButton buttonColor="#2FA398" position="right" zIndex={2} onPress={() => Actions.criarpublicacao()} />
                


                <FlatList

                    data={this.state.data}
                    renderItem={
                        ({ item }) =>

                            <MyListItem

                                key={item.id}
                                Titulo={item.title}
                                Desc={item.description}
                                image={item.image}



                            />
                    }
                />
            </View>
        );
    }
}


const style = StyleSheet.create({

    container: {

        marginBottom: 0,
        marginTop: 15,
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


});
