/**
 * Model class for every app item.
 * 
 * NOTES:
 * React.create | extends Component 
 * https://toddmotto.com/react-create-class-versus-component/
 */

'use strict';
import React , {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    AsyncStorage
} from 'react-native';

import Request from './api';

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#FF6600',
        padding: 10,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    body: {
        flex: 9,
        backgroundColor: '#F6F6EF'
    },
    header_item: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    },
    header_text: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    },
    button: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    news_item: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 5
    },
    news_item_text: {
        color: '#575757',
        fontSize: 18
    }
});

class FreeAppItem extends Component {
    constructor(props) {
        consloe.log("constructor");
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        const news = {};
        this, state = {
            title: 'Reader',
            loaded: false
        }

    }

    componentDidMount() {
        console.log('Did mount');
    }

    getApps() {
        Request.getTopFreeApps();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>
                        {this.title}
                    </Text>
                    <View style={styles.header_item}>
                        {
                            !this.state.loaded &&
                            <GiftedSpinner />
                        }
                    </View>
                </View>
                <View style={styles.body}>
                    <ScrollView ref="scrollView">
                        {
                            this.state.loaded &&
                            <ListView
                                initialListSize={1}
                                dataSource={this.state.news}
                                style={styles.news}
                                renderRow={this.renderNews}>
                            </ListView>
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}