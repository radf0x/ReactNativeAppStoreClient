import React from 'react';

const Request = {
    getTopFreeApps() {
        fetch("https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json",
            { method: "GET" })
            .then((response) => {
                return response.json();
            })
            .then(response => {
                console.log(response.feed);
                return response.feed;
            })
            .catch((exception) => {
                console.log(exception);
            });
    }
}

/**
 * getNotes() {
 return fetch(jsonURL).then((res) => res.json())
 },

// Components/Notes.js

componentDidMount() {
  this.fetchData();
}

fetchData() {
  api.getNotes()
  .then((data) => {
    this.setState({
      dataSource: this.ds.cloneWithRows(data),
      isLoading: false,
      empty: false,
      rawData: data,
    });
  })
  .catch((error) => {
    console.log(error)
    this.setState({
      empty: true,
      isLoading: false,
    });
  });
}

 */
export default Request; 