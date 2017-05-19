import React, { Component } from 'react';
import {
    View,
    ListView,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    AsyncStorage,
    RefreshControl
} from 'react-native';

import RatingView from 'react-native-star-rating-view/StarRatingBar';
import RecommendedListView from './RecommendedListView';

let ratingResults = [];
let topApps = [];
let displayingApps = [];

export default class TopAppsListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            currentStart: 0,
            queryingRating: true,
            queryingTopApps: true,
            page: 1,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    componentDidMount() {
        this.queryTopFreeApps();
    }

    /**
     * Should wrap it in API.js
     */
    queryTopFreeApps() {
        fetch("https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json",
            { method: "GET" })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                this.persistApps('topapps', data.feed.entry);
                // this.queryAppDetailById(topApps)
            })
            .catch((exception) => {
                console.log(exception);
            })
            .done();
    }

    /**
     * 
     * Should wrap it in API.js
     */
    queryAppDetailById(topApps) {
        //todo query lookup API.
        topApps.map(function (item) {
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
    }

    persistApps(key, json) {
        try {
            AsyncStorage
                .setItem(key, JSON.stringify(json))
                .then(this.getCachedApps(key));
        } catch (error) {
            console.log(error)
        }
    }

    async getCachedApps(key) {
        if (this.state.currentStart != 0) {
            displayingApps = displayingApps.concat(topApps.slice(this.state.currentStart, this.state.currentStart + 10))
        } else {
            console.log('first time')
            try {
                await AsyncStorage.getItem(key).then((value) => {
                    topApps = JSON.parse(value)
                    displayingApps = topApps.slice(0, 10)
                })

            } catch (error) {
                console.log(error)
            }
        }
        console.log(displayingApps)
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(displayingApps),
            queryingTopApps: false
        });
    }

    _renderRecommendedView() {
        return (
            <RecommendedListView />
        )
    }

    _renderFooter = () => {
        if (!this.state.queryingTopApps) {
            return <View style={styles.scrollSpinner} />
        }
        return <ActivityIndicator style={styles.scrollSpinner} />
    }

    /**
     * odd row ? round corner : circle 
     */
    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.index}>
                    {parseInt(rowID) + 1}
                </Text>
                {
                    parseInt(rowID) % 2 == 0
                        ?
                        <Image source={{ uri: rowData['im:image'][0].label }} style={styles.thumbnailEven} />
                        :
                        <Image source={{ uri: rowData['im:image'][0].label }} style={styles.thumbnailOdd} />
                }
                <View style={styles.textContainer}>
                    <Text style={styles.name}>
                        {`${rowData['im:name'].label}`}
                    </Text>
                    <Text style={styles.category}>
                        {`${rowData.category.attributes.term}`}
                    </Text>
                    <RatingView
                        score={0}
                        allowsHalfStars={true}
                        tintColor={'red'}
                        scoreTextColor={'red'}
                    />
                </View>

            </View>
        );
    }

    _onEndReached() {
        if (this.state.currentStart == topApps.length) {
            return
        }

        if (this.state.currentStart != 0) {
            this.getCachedApps('topapps')
        }
        this.setState({
            currentStart: this.state.currentStart + 10,
            dataSource: this.state.dataSource.cloneWithRows(displayingApps)
        })
    }

    _onRefresh() {
        this.setState({
            refreshing: true,
            currentStart: 0,
        })
        displayingApps = [];
        this.queryTopFreeApps();
        this.setState({ refreshing: false })
    }

    render() {
        return (
            <View>
                {
                    !this.state.queryingTopApps &&
                    <ListView
                        initialListSize={5}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        onEndReachedThreshold={10}
                        onEndReached={this._onEndReached.bind(this)}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                        renderHeader={this._renderRecommendedView}
                        renderFooter={this._renderFooter}
                        renderSeparator={(rowID) => <View key={rowID} style={styles.separator} />
                        }
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
    thumbnailOdd: {
        height: 60,
        width: 60,
        borderRadius: 10,
        margin: 10
    },
    thumbnailEven: {
        height: 60,
        width: 60,
        borderRadius: 30,
        margin: 10
    },
});