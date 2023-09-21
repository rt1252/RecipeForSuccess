import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

export default function Login({navigation}) {
  const [user, setUser] = useState("");
  const [popupActive,setPopupActive] = useState(false);
  const [popupType, setPopupType] = useState('Login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN
  // const API_BASE = "http://localhost:8080/"+process.env.REACT_APP_API_TOKEN

  const createUser = async (email,username,password) => {
    const data = await fetch(API_BASE+"/user/new", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({email: email, username: username, password: password})
    }).then(navigation.navigate('Home',{username:username}));
  }

  const getUser = async email => {
      const data = await fetch(API_BASE+"/user/get/" + email, {method: "GET"})
        .then(res => res.json())
      if (data.length == 0) {
        console.log("Email is not registered!");
        setPassword("")
        return;
      }
      bcrypt.compare(password, data[0].hash,
        async function (err, isMatch) {

            // Comparing the original password to
            // encrypted password
            if (isMatch) {
                await setUsername(data[0].username)
                navigation.navigate('Home',{username:data[0].username})
            }

            if (!isMatch) {

                // If password doesn't match the following
                // message will be sent
                console.log('Wrong Password');
                setPassword("");
            }
      });
    }

  function displayPopup(type) {
      switch(type) {
        case 'Login':
          return(
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
            />
            <TouchableOpacity
              style={styles.login}
              onPress={() => {
                getUser(email,password)
              }}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
          );
        case 'Create':
          return(
            <View>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
            />
            <TextInput 
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
            />
            <TouchableOpacity
              style={styles.login}
              onPress={() => {
                createUser(email,username,password)
              }}
            >
              <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
            </View>
          );
        case 'Forgot':
          return(
            <View>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
            />
            <TouchableOpacity
              style={styles.login}
              onPress={() => {
                getUser(email,password)
              }}
            >
              <Text style={styles.loginText}>Send Email</Text>
            </TouchableOpacity>
            </View>
          );
        }
    }

    return (
    <View style={styles.background}>
        <View style={styles.container}>
            <View style={styles.top}>
                <Image style={styles.logo} source={require("../assets/favicon.png")}></Image>
                {/* <Text style={styles.text}>Welcome to Recipe For Success</Text> */}
                <Text style={styles.undertext}>Welcome</Text>
            </View>
            <View style={styles.bottom}>
            {/* <TouchableOpacity
            style={styles.login}>
            <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity> */}
                {popupActive ?
                    <View> 
                        {displayPopup(popupType)}
                        <TouchableOpacity
                            style={styles.x}
                            onPress={() => {
                            setPopupActive(!popupActive)
                            }}
                        >
                            <Text style={styles.x}>x</Text>
                        </TouchableOpacity>
                    </View>
                    :<TouchableOpacity
                    style={styles.login}
                    onPress={() => {
                        setPopupActive(!popupActive)
                        setPopupType('Login')
                    }}
                    >
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>}
                    <View style={styles.createlinks}>
                        <TouchableOpacity
                            style={styles.createAcct}
                            onPress={() => {
                            setPopupActive(true)
                            setPopupType('createAcct')
                        }}>
                        <Text style={styles.createAcct}>Create Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.createAcct}
                            onPress={() => {
                            setPopupActive(true)
                            setPopupType('Forgot')
                        }}>
                            <Text style={styles.create}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.undertext}>Don't have an account?</Text>
                    <TouchableOpacity
                    style={styles.guestLink}
                    onPress={() => {
                      navigation.navigate('Home',{username:"Guest"})
                    }}>
                        <Text style={styles.guestText}>Continue As Guest</Text>
                    </TouchableOpacity>
                <StatusBar style="auto" />
            </View>
        </View>
    </View>
    )
}

const styles = EStyleSheet.create({
    background: {
      backgroundColor: '#ddd',
      flex: 1
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      marginHorizontal: 30,
      marginVertical: 40,
      borderRadius: 40
    },
    top: {
      flex: 1,
      marginTop: 40,
      justifyContent: 'center'
    },
    bottom: {
      flex: 3,
      justifyContent: 'center'
    },
    logo: {
      height: 100,
      width: 100,
      alignSelf: 'center'
    },
    text: {
      textAlign: 'center',
      fontSize: '2rem',
      padding: 10
    },
    createlinks: {
      flexDirection: 'row',
    },
    create: {
      flex: 1,
      fontSize: '1rem',
      justifyContent: 'center',
      textAlign: 'center'
    },
    undertext: {
      textAlign: 'center',
      fontSize: '1.25rem',
      padding: 10
    },
    login: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
      borderRadius: 30,
      marginBottom: 20,
      width: 200,
      height: 50,
      alignSelf:  'center'
    },
    loginText: {
      color: 'white',
      fontSize: '1rem',
    },
    input: {
      backgroundColor: '#D1D1D1',
      borderRadius: 30,
      fontSize: '1rem',
      width: 200,
      padding: 12,
      marginBottom: 20,
      alignSelf: 'center'
    },
    x: {
      alignSelf: 'center',
      padding: 2,
      color: 'black',
      fontSize: '1.1rem'
    },
    guestLink: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ddd',
      height: 50,
      width: 150,
      borderRadius: 30
    },
    guestText: {
      color: 'black',
      fontSize: '0.85rem'
    }
  });
