/**
 * A sticky header view serve as a search bar
 */

import React from 'react';
import {
    View,
    TextInput,
    StyleSheet
} from 'react-native';

class SearchView extends React.Component {

    constructor(props) {
        super(props);
    }

    filterApps(keywords) {
        let text = keywords.toLowerCase();
        this.props.data.map(function (item) {
            if (keywords.toLowerCase().contains(item['im:name'].label.toLowerCase())) {
                console.log(item['im:name'].label)
            }
        })
        // console.log(this.props.data)
        // console.log(keywoards)
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder={" " + this.props.placeHolder}
                    placeholderStyle={{ color: 'red' }}
                    onChangeText={(keywords) => this.filterApps(keywords)}
                />
            </View>
        )
    }
}

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


export default SearchView; 