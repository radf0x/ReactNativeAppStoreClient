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
        console.log('did mount');
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

    _renderRow() {
        return (
            <View></View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Recommended</Text>
                <ListView
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
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFC1C1'
    },
    header: {
        margin: 20,
        color: 'black'
    }
});