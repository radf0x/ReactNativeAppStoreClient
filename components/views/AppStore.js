/**
 * NOTES:
 * React.create | extends Component 
 * https://toddmotto.com/react-create-class-versus-component/
 */
import React, { Component } from 'react';
import TopAppsListView from './TopAppsListView';

export default class AppStore extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <TopAppsListView />
        );
    }
}