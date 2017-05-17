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
    name: {
        flex:1,
        fontSize: 16,
    },
    category: {
        flex:1,
        fontSize: 12,
    },
    thumbnail: {
        height: 40,
        width: 40,
        flex:1,
        borderRadius: 10,
        margin: 10
    }
});

const RowEven = (props) => (
    <View style={styles.container}>
        <Image source={{ uri: props['im:image'][0].label }} style={styles.thumbnail} />
        <Text style={styles.name}>
            {`${props['im:name'].label}`}
        </Text>
    </View>
);

export default RowEven;