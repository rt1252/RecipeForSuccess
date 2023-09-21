import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import SearchBarComponent from '../Components/searchBar2'

export default function Home({ navigation,route }) {
    return(
        <View>
            <Text>Welcome {route.params.username}!</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Login")
                }}
                >
                <Text>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}