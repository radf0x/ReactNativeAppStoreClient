/**
 * Vertical rows to display 100 free apps.
 */
import React from 'react';
import {
    View,
    TextView,
    Image,
    StyleSheet
} from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginLeft: 12,
        fontSize: 16
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20
    }
});

const RowFreeApp = (props) => (
    <View style={styles.container}>
        <Image
            source={{ uri: props.picture.large }}
            style={styles.photo}
        />
        <Text style={styles.text}>
            {`${props.im:name.label}`}}
        </Text>
    </View>
)

export default RowFreeApp;