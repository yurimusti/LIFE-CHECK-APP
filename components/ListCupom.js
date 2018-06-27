
import React, { Component } from 'react';
import {
    View, ScrollView,
    FlatList,
    Dimensions,
    AsyncStorage


} from 'react-native';
import {
    PricingCard
} from 'react-native-elements';

import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';



const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


export default class Listagem extends React.PureComponent {

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
            <View style={{ backgroundColor: '#f3f3f3', flex: 1 }}>

                <ActionButton buttonColor="#2FA398" position="right" zIndex={2} onPress={() => Actions.criarcupom()} />


                <FlatList

                    data={this.state.data}




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





            </View>
        );
    }
}

