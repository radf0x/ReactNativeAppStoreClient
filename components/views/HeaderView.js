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
        height: 42,
        flex: 1,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
});

class HeaderView extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.title)
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder={" "+this.props.title}
                    placeholderTextColor= 'gray'
                    onChangeText={(keywoards) => console.log("searching for :", keywoards)}
                />
            </View>
        )
    }
}

export default HeaderView;