/**
 * Model class for every app item.
 * 
 * NOTES:
 * React.create | extends Component 
 * https://toddmotto.com/react-create-class-versus-component/
 */

'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    ListView,
    View,
    Image,
    ScrollView,
    AsyncStorage
} from 'react-native';

import Request from './api';
// import RowOdd from '../views/RowOdd';
// import RowEven from '../views/RowEven';
import HeaderView from '../views/HeaderView';

class FreeAppItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Awesome App Store",
            loaded: false,
            page: 1,
            apps: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getTopFreeApps();
    }

    getTopFreeApps() {
        fetch("https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json",
            { method: "GET" })
            .then((response) => {
                return response.json();
            })
            .then(response => {
                this.setState({
                    posts: response.feed.entry,
                    dataSource: this.state.dataSource.cloneWithRows(response.feed.entry),
                    loaded: true,
                    page: this.state.page + 1
                });
            })
            .catch((exception) => {
                console.log(exception);
            })
            .done();
    }

    queryAppById() {
        //todo query lookup API.
    }

    updateFreeAppsUI() {

    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.index}>
                    {parseInt(rowID) + 1}
                </Text>
                <Image source={{ uri: rowData['im:image'][0].label }} style={styles.thumbnail} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>
                        {`${rowData['im:name'].label}`}
                    </Text>
                    <Text style={styles.category}>
                        {`${rowData.category.attributes.term}`}
                    </Text>
                </View>
            </View>
        );
    }

    _renderHeader() {
        return (
            <HeaderView title={this.state.title}/>
        )
    }

    render() {
        console.log();
        return (
            <View>
                {
                    this.state.loaded &&
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                        renderHeader={this._renderHeader.bind(this)}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({

    itemContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
    },
    index: {
        lineHeight: 50,
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    name: {
        marginTop: 6,
        fontSize: 16,
    },
    category: {
        fontSize: 12,
    },
    thumbnail: {
        height: 60,
        width: 60,
        borderRadius: 10,
        margin: 10
    }
});

export default FreeAppItem;