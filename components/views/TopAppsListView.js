import React, { Component } from 'react';
import {
    View,
    ListView,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    AsyncStorage,
    RefreshControl,
    ActivityIndicator,
    TextInput
} from 'react-native';

import RatingView from 'react-native-star-rating-view/StarRatingBar';

let recommenedApps = [];
let ratingResults = [];
let topApps = [];
let displayingApps = [];
const PLACEHOLDER = "Search for app";

export default class TopAppsListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searching: false,
            refreshing: false,
            currentStart: 0,
            queryingRating: true,
            queryingTopApps: true,
            bQueryingRecommendedApps: true,
            page: 1,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            dataSourceRecommended: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    componentDidMount() {
        this.queryTopFreeApps();
        this.queryRecommendedApps();
    }

    componentWillUnmount() {
        this.timer && clearTimeOut(this.timer);
    }

    /**
     * Requests should wrap it in API.js
     */
    async queryTopFreeApps() {
        await fetch("https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json",
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

    async queryAppDetailById(topApps) {
        topApps.map(function (item) {
            fetch("https://itunes.apple.com/hk/lookup?id=" + item.id.attributes['im:id'], { method: "GET" })
                .then((response) => {
                    return response.json();
                })
                .then(response => {
                    ratingResults = response.results.averageUserRating;
                })
                .catch((exception) => {
                    console.log(exception);
                })
                .done();
        })
    }

    async queryRecommendedApps() {
        await fetch("https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json", { method: "GET" })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                this.persistRecommendedApps('recommended', data.feed.entry)
            })
            .catch((exception) => {
                console.log(exception);
            })
            .done();
    }

    /**
     * Persist apps to storage
     */

    async persistRecommendedApps(key, json) {
        try {
            await AsyncStorage
                .setItem(key, JSON.stringify(json))
                .then(this.getCachedRecommendedApps(key));
        } catch (error) {
            console.log(error)
        }
    }

    async persistApps(key, json) {
        try {
            await AsyncStorage
                .setItem(key, JSON.stringify(json))
                .then(this.getCachedApps(key));
        } catch (error) {
            console.log(error)
        }
    }

    async getCachedRecommendedApps(key) {
        try {
            await AsyncStorage.getItem(key).then((value) => {
                recommenedApps = JSON.parse(value)
                this.setState({
                    dataSourceRecommended: this.state.dataSourceRecommended.cloneWithRows(recommenedApps),
                    bQueryingRecommendedApps: false
                });
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getCachedApps(key) {
        if (this.state.currentStart != 0) {
            displayingApps = displayingApps.concat(topApps.slice(this.state.currentStart, this.state.currentStart + 10))
        } else {
            try {
                await AsyncStorage.getItem(key).then((value) => {
                    topApps = JSON.parse(value)
                    displayingApps = topApps.slice(0, 10)
                })

            } catch (error) {
                console.log(error)
            }
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(displayingApps),
            queryingTopApps: false,
            currentStart: this.state.currentStart + 10
        });
    }

    /**
     * Filter functions
     */

    filterApps(keywords) {
        if (keywords.length == 0) {
            this.setState({
                searching: false,
                dataSource: this.state.dataSource.cloneWithRows(topApps.slice(0, 10)),
            })
        } else {
            const filtered = topApps.filter(function (item) {
                const itemData = item['im:name'].label.toLowerCase();
                const searchData = keywords.toLowerCase().replace(/\\/g, "\\\\");
                return itemData.search(searchData) !== -1;
            });

            console.log(filtered)

            this.setState({
                searching: true,
                dataSource: this.state.dataSource.cloneWithRows(filtered),
            })
        }
    }

    filterRecommendedApps(keywords) {
        if (keywords.length == 0) {
            this.setState({
                searching: false,
                dataSourceRecommended: this.state.dataSourceRecommended.cloneWithRows(recommenedApps),
            })
        } else {
            const filtered = recommenedApps.filter(function (item) {
                const itemData = item['im:name'].label.toLowerCase();
                const searchData = keywords.toLowerCase().replace(/\\/g, "\\\\");
                return itemData.search(searchData) !== -1;
            });

            console.log(filtered)

            this.setState({
                searching: true,
                dataSourceRecommended: this.state.dataSourceRecommended.cloneWithRows(filtered),
            })
        }
    }

    /**
     * Render view components
     */
    renderSearchView() {
        return (
            <View style={searchStyles.searchContainer}>
                <TextInput
                    style={searchStyles.input}
                    placeholder={" " + PLACEHOLDER}
                    onChangeText={(keywords) => {
                        this.filterApps(keywords),
                            this.filterRecommendedApps(keywords)
                    }}
                />
            </View>
        )
    }

    renderRecommendedView() {
        return (
            <View style={recommenedStyles.container}>
                <Text style={recommenedStyles.header}>Recommended</Text>
                {
                    !this.state.bQueryingRecommendedApps &&
                    <ListView
                        initialListSize={5}
                        enableEmptySections={true}
                        horizontal={true}
                        dataSource={this.state.dataSourceRecommended}
                        renderRow={this._renderRecommendRow}
                    />
                }
            </View>
        )
    }

    renderFooter = () => {
        if (this.state.searching) {
            return
        }
        if (this.state.currentStart == topApps.length) {
            return <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                margin: 20,
            }}><Text>END OF FEED</Text></View>
        } else {
            return <ActivityIndicator
                style={[styles.centering
                    , { backgroundColor: '#ffffff', margin: 20 }]}
            />
        }
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
                    {/*<RatingView
                        score={0}
                        allowsHalfStars={true}
                        tintColor={'red'}
                        scoreTextColor={'red'}
                    />*/}
                </View>

            </View>
        );
    }

    _renderRecommendRow(rowData, sectionID, rowID) {
        return (
            <View style={recommenedStyles.itemContainer}>
                <Image style={recommenedStyles.thumbnail}
                    source={{ uri: rowData['im:image'][0].label }} />
                <Text style={recommenedStyles.name}>
                    {rowData['im:name'].label}
                </Text>
                <Text style={recommenedStyles.category}>
                    {rowData.category.attributes.term}
                </Text>
            </View>
        );
    }


    /**
     * UI Callbacks
     */
    _onEndReached() {
        if (this.state.currentStart == topApps.length || this.state.searching) {
            return
        }
        this.timer = setTimeout(
            () => {
                if (this.state.currentStart > 0) {
                    this.getCachedApps('topapps')
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(displayingApps)
                })
            }, 250);
    }

    _onRefresh() {
        if (this.state.searching) {
            return
        }
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
            <View style={styles.mainContainer}>
                {this.renderSearchView()}
                <View style={{ flex: 1 }}>
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
                            renderHeader={this.renderRecommendedView.bind(this)}
                            renderFooter={this.renderFooter}
                            renderSeparator={(rowID) => <View key={rowID} style={styles.separator} />
                            }
                        />
                    }
                </View>
            </View>
        );
    }
}

const recommenedStyles = StyleSheet.create({
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
})

const searchStyles = StyleSheet.create({
    searchContainer: {
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: .25,
        borderColor: 'gray'
    },
    input: {
        height: 35,
        fontSize: 12,
        backgroundColor: '#EEE9E9',
        borderRadius: 10,
    }
})

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
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