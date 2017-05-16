import React from 'react';
import { View, TextView, StyleSheet, Image } from 'react-native';

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

const RowHorizontal = (props) => (
    <View style={styles.container}>
        <Image
            source={{ uri: props.picture.large }}
            style={styles.photo}
        />
        <Text style={styles.text}>
            // data model         dummy text  data model
            {`${props.name.first}`}{`---`}{`${props.name.last}`}
        </Text>
    </View>
)

export default RowHorizontal;