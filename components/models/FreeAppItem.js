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
import RowOdd from '../views/RowOdd';
import RowEven from '../views/RowEven';
import HeaderView from '../views/HeaderView';

class FreeAppItem extends Component {
    constructor(props) {
        console.log("constructor");
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
        console.log('Will mount');
    }

    componentDidMount() {
        console.log('Did mount');
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
            });
    }

    queryAppById() {
        //todo query lookup API.
    }

    updateFreeAppsUI() {

    }

    _renderRow() {
        // console.log("json: ", app['im:image'][0]);
        (apps) => <RowOdd {...apps} />
    }

    render() {
        console.log();
        return (
            <View>
                {
                    this.state.loaded &&
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(apps) => <RowOdd{...apps} />}
                        renderHeader={(title) => <HeaderView {...title} />}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    }
});

export default FreeAppItem;