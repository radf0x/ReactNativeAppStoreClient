/**
 * A sticky header view serve as a search bar
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C1C1C1',
    },
    input: {
        height: 30,
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
});

const HeaderView = (props) => (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeHolder="Search for apps"
            onChangeText={(text) => console.log("searching for :", text)}
        />
    </View>
);

export default HeaderView;