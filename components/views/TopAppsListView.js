import React, { Component } from 'react';
import {
    View,
    ListView,
    StyleSheet,
    Text,
    Image,
    ScrollView
} from 'react-native';

import RatingView from 'react-native-star-rating-view/StarRatingBar';
import RecommendedListView from '../views/RecommendedListView';

let ratingResults = [];
let topApps = [];

export default class TopAppsListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryingRating: false,
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
                console.log(data.feed.entry);
                topApps = data.feed.entry;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(topApps),
                    queryingTopApps: false,
                    page: this.state.page + 1
                });
                this.queryAppDetailById(topApps)
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

    _renderRecommendedView() {
        return (
            <RecommendedListView />
        )
    }

    _renderFooter = () => {
        if (!this.state.queryingTopApps) {
            console.log('loaded');
            return <View style={styles.scrollSpinner} />
        }
        console.log('loading');
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
    render() {
        return (
            <View>
                <ScrollView>
                    {
                        !this.state.queryingTopApps &&
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            renderHeader={this._renderRecommendedView}
                            renderFooter={this._renderFooter}
                            renderSeparator={(rowID) => <View key={rowID} style={styles.separator} />}
                        />
                    }
                </ScrollView>
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