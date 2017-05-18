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
import RatingView from 'react-native-star-rating-view/StarRatingBar'
import HeaderView from '../views/HeaderView';


let ratingResults = [];
let apps = [];
class FreeAppItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryingRating: false,
            title: "Awesome App Store",
            queryingTopApps: true,
            page: 1,
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

    /**
     * Should wrap it in API.js
     */
    getTopFreeApps() {
        fetch("https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json",
            { method: "GET" })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data.feed.entry)
                apps = data.feed.entry,
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(apps),
                        queryingTopApps: false,
                        page: this.state.page + 1
                    });
                this.queryAppDetailById(apps)
            })
            .catch((exception) => {
                console.log(exception);
            })
            .done();
    }

    /**
     * Should wrap it in API.js
     */
    queryAppDetailById(apps) {
        apps.map(function (item) {
            fetch("https://itunes.apple.com/hk/lookup?id=" + item.id.attributes['im:id'], { method: "GET" })
                .then((response) => {
                    return response.json();
                })
                .then(response => {
                    // console.log(response.results)
                    // ratingResults = response.results.averageUserRating;
                })
                .catch((exception) => {
                    console.log(exception);
                })
                .done();
        })
        // console.log(ratingResults)
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
                    <RatingView style={styles.star}
                        score={0}
                        allowsHalfStars={true}
                        tintColor={'red'}
                        scoreTextColor={'red'}
                    />
                </View>

            </View>
        );
    }

    _renderHeader() {
        return (
            <HeaderView title={this.state.title} />
        )
    }

    render() {
        console.log();
        return (
            <View>
                {
                    !this.state.queryingTopApps &&
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
        marginTop: 6,
        fontSize: 12,
    },
    thumbnail: {
        height: 60,
        width: 60,
        borderRadius: 10,
        margin: 10
    },
    star: {
        marginTop: 6,
    }
});

export default FreeAppItem;