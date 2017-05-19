/**
 * NOTES:
 * React.create | extends Component 
 * https://toddmotto.com/react-create-class-versus-component/
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import SearchView from './SearchView';
import TopAppsListView from './TopAppsListView';

const title = "Search for app";

export default class AppStore extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    _renderTopAppsView() {
        return (
            <TopAppsListView />
        )
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <SearchView style={styles.headerContainer}
                    placeHolder={title} />
                <View style={styles.contentContainer}>
                    {this._renderTopAppsView()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    headerContainer: {
        flexDirection: 'row',
    },
    contentContainer: { // app list view style
        flex: 6,
    },
    scrollSpinner: {
        marginVertical: 20,
    },
    separator: {
        flex: 1,
        height: .25,
        backgroundColor: 'gray',
    }
});