/**
 * Vertical rows to display 100 free apps.
 */
import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContainer: {
        flexDirection: 'column'
    },
    name: {
        fontSize: 16,
    },
    category: {
        fontSize: 12,
    },
    thumbnail: {
        height: 40,
        width: 40,
        borderRadius: 10,
        margin: 10
    }
});

const RowOdd = (props) => (
    <View style={styles.container}>
        <Image source={{ uri: props['im:image'][0].label }} style={styles.thumbnail} />
        <View style={styles.textContainer}>
            <Text style={styles.name}>
                {`${props['im:name'].label}`}
            </Text>
            <Text style={styles.category}>
                {`${props['im:name'].label}`}
            </Text>
        </View>
    </View>
);

export default RowOdd;