import React, { Component } from 'react';
import { Router, Scene, Tabs, Modal } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { AsyncStorage } from 'react-native';


import Login from './components/Login';
import Cadastro from './components/Cadastro';

//BottomBar
import ListPublicacao from './components/ListPublicacao';
import ListCupom from './components/ListCupom';
import PerfilUsuario from './components/PerfilUsuario';
import Yuri from './components/yuri';

import PerfilPublicacao from './components/PerfilPublicacao';
import CriarCupom from './components/CriarCupom';
import CriarPublicacao from './components/CriarPublicacao';

export default class App extends React.Component {


  //react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res



  componentDidMount() {


    AsyncStorage.getItem('client')
      .then((value) => {


        if (value == null) {

          this.setState({
            logado: false
          });


        } else {
          this.setState({
            logado: true
          });


        }
      }).done();


  }



  render() {



    return (


      <Router>

        <Modal>

          <Scene key='root'>



            <Scene
              key='login'
              title='Login'
              component={Login}
              initial
            />

            <Scene
              key='cadastro'
              title='Cadastro'
              component={Cadastro}


            />




            <Scene
              key='tabbar'
              hideNavBar
              tabBarPosition='bottom'
              tabs={true}
              showLabel={false}



            >
              <Scene
                key='notices'
                icon={({ focused }) => <Icon
                  name='globe'
                  type='font-awesome'
                  color={focused ? '#2FA398' : '#ccc'} />}

                hideNavBar
                swipeEnabled={true}

              >
                <Scene
                  key='notices2'
                  component={ListPublicacao}
                  hideNavBar
                />

                <Scene
                  key='criarpublicacao'
                  title='Criar Publicação'
                  component={CriarPublicacao}
                  hideNavBar
                />

              </Scene>

              <Scene
                key='listcupom'
                icon={({ focused }) => <Icon
                  name='cart-plus'
                  type='font-awesome'
                  color={focused ? '#2FA398' : '#ccc'} />}
                hideNavBar
              >
              
                <Scene
                  key='listcupom2'
                  component={ListCupom}
                  hideNavBar
                />
                <Scene
                  key='criarcupom'
                  title='Criar Cupom'
                  component={CriarCupom}
                  hideNavBar
                />


              </Scene>

              <Scene
                key='perfil' icon={({ focused }) => <Icon
                  name='user'
                  type='font-awesome'
                  color={focused ? '#2FA398' : '#ccc'} />}
                hideNavBar
              >
                <Scene
                  key='perfil2'
                  component={PerfilUsuario}
                  hideNavBar
                />
              </Scene>

            </Scene>





          </Scene>

        </Modal>



      </Router>

    );



  }
}
