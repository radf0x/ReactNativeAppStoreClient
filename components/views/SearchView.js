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
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: .25,
        borderColor: 'gray'
    },
    input: {
        height: 35,
        fontSize: 12,
        backgroundColor: '#EEE9E9',
        borderRadius: 10,
    },
    placeHolder: {
        justifyContent: 'center',
    }
});

class SearchView extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.placeHolder)
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder={" " + this.props.placeHolder}
                    placeholderStyle={{ color: 'red' }}
                    onChangeText={(keywoards) => console.log("searching for :", keywoards)}
                />
            </View>
        )
    }
}

export default SearchView; 