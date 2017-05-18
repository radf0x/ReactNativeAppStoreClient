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
        backgroundColor: '#C1C1C1',
    },
    input: {
        height: 42,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
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
                    placeholder={" "+this.props.placeHolder}
                    placeholderTextColor= 'gray'
                    onChangeText={(keywoards) => console.log("searching for :", keywoards)}
                />
            </View>
        )
    }
}

export default SearchView; 