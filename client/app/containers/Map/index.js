import React, { Component } from './node_modules/react';
import { render } from './node_modules/react-dom';
import Map from './map'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Map
        id="myMap"
        options={{
          center: { 
              lat: 41.0082, 
              lng: 28.9784
               },
          zoom: 8
        }}
        onMapLoad={map => {
          var marker = new window.google.maps.Marker({
            position: { 
                lat: 41.0082, 
                lng: 28.9784
                 },
            map: map,
            title: 'Hello Istanbul!'
          });
        }}
      />
    );
  }
}

render(<App />, document.getElementById('root'));