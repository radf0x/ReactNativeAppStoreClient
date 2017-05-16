import React from 'react';
import {
    View,
    ListView,
    StyleSheet,
    Text
} from 'react-native';
import RowHorizontal from './view/RowHorizontal'

/**
 * Main component for 100 free apps.
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
});

class ListViewHorizontal extends React.Component {
    constructor(props) {
        super(props);
        const source = new ListView.dataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: source.cloneWithRows(['row 1', 'row 2']),
        };
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={ // passed the data for that row as a prop to the renderrow function
                    (data) => <RowHorizontal {...data} />
                }
            />
        )
    }
}

export default ListViewHorizontal;