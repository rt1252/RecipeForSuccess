import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import SearchBarComponent from '../Components/searchBar2'

export default function Home(){
    return(
        <view>
            <SearchBarComponent />
        </view>
    );
}