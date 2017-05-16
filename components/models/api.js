import React from 'react';

const Request = {
    getTopFreeApps() {
        fetch("https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json",
            { method: "GET" })
            .then((response) => { 
                return response.json() 
            })
            .catch((exception)=>{
                console.log(exception);
            });
    }
}

export default Request; 