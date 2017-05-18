import React, { Component } from 'react';
import {
    View,
    ListView,
    StyleSheet,
    Text,
    Image
} from 'react-native';

let recommenedApps = [];

export default class RecommendedListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        }
    }

    componentDidMount() {
        this.queryRecommendedApps();
    }

    /**
     * Should wrap it in API.js
     */
    queryRecommendedApps() {
        fetch("https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json", { method: "GET" })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                recommenedApps = data.feed.entry;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(recommenedApps),
                })
                console.log(data.feed.entry)
            })
            .catch((exception) => {
                console.log(exception);
            })
            .done();
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.itemContainer}>
                <Image style={styles.thumbnail}
                    source={{ uri: rowData['im:image'][0].label }} />
                <Text style={styles.name}>
                    {rowData['im:name'].label}
                </Text>
                <Text style={styles.category}>
                    {rowData.category.attributes.term}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Recommended</Text>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    horizontal={true}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: .25,
        borderColor: 'gray',
        flexDirection: 'column',
        backgroundColor: '#ffffff'
    },
    header: {
        margin: 16,
        color: 'black',
        fontSize: 16,
    },
    itemContainer: {
        width: 75,
        marginLeft: 16,
        marginRight: 16,
        flexDirection: 'column'
    },
    name: {
        marginTop: 8,
        justifyContent: 'center',
        fontSize: 12,
    },
    category: {
        marginTop: 8,
        marginBottom: 8,
        justifyContent: 'center',
        fontSize: 10,
    },
    thumbnail: {
        height: 60,
        width: 60,
        borderRadius: 10,
    },
});