import React, { Component } from 'react';
import {
    View,
    TextView
} from 'react-native';

import {
    Icon
} from 'react-native-elements'

export default class Yuri extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', flex: 1, backgroundColor:'#fff' }}>

                <View style={{flex: 1, justifyContent:'center' }}>

                    <View style={{alignItems:'center', }}>
                        <Icon
                            reverse
                            name='chevron-circle-up'
                            type='font-awesome'
                            color='#517fa4'
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Icon
                            reverse
                            name='chevron-circle-left'
                            type='font-awesome'
                            color='#517fa4'
                        />
<View style={{width:40}}></View>
                        <Icon
                            reverse
                            name='chevron-circle-right'
                            type='font-awesome'
                            color='#517fa4'
                        />
                    </View>

                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <Icon
                            reverse
                            name='chevron-circle-down'
                            type='font-awesome'
                            color='#517fa4'
                        />
                    </View>









                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
                    <Icon
                        reverse
                        name='car'
                        type='font-awesome'
                        color='#517fa4'
                    />


                </View>

            </View>
        )
    }
};
