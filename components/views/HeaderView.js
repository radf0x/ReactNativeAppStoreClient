/**
 * A sticky header view serve as a search bar
 */

import React from 'react';
import {
    View,
    TextInput,
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
        height: 50,
        flex: 1,
        fontSize: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
});

class HeaderView extends React.Component {

    constructor(props) {
        super(props);
    
    }
    render() {
        console.log(this.text);
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeHolder={this.title}
                    placeholderTextColor='gray'
                    onChangeText={() => console.log("searching for :", this.title)}
                />
            </View>
        )
    }
}

/*const HeaderView = (props) => (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeHolder="Search for apps"
            placeholderTextColor='gray'
            onChangeText={(text) => console.log("searching for :", text)}
        />
    </View>
);
*/
export default HeaderView;