import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};  

render() {
  return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176}}>
        
         <Marker position={{ lat: 48.00, lng: -122.00}} />
        </Map>
  );
};
 
export default GoogleApiWrapper({
  apiKey: 'https://maps.google.com/maps/api/js?key=AIzaSyDp-wGf8bAFiupvslCmWxUul4HiiBTNKYo'
})(MapContainer);

// import React, { Component } from './node_modules/react';
// import { render } from './node_modules/react-dom';

// class Map extends Component {
//   constructor(props) {
//     super(props);
//     this.onScriptLoad = this.onScriptLoad.bind(this)
//   }

//   onScriptLoad() {
//     const map = new window.google.maps.Map(
//       document.getElementById(this.props.id),
//       this.props.options);
//     this.props.onMapLoad(map)
//   }

//   componentDidMount() {
//     if (!window.google) {
//       var s = document.createElement('script');
//       s.type = 'text/javascript';
//       s.src = `https://maps.google.com/maps/api/js?key=AIzaSyDp-wGf8bAFiupvslCmWxUul4HiiBTNKYo`;
//       var x = document.getElementsByTagName('script')[0];
//       x.parentNode.insertBefore(s, x);
//       // Below is important. 
//       //We cannot access google.maps until it's finished loading
//       s.addEventListener('load', e => {
//         this.onScriptLoad()
//       })
//     } else {
//       this.onScriptLoad()
//     }
//   }

//   render() {
//     return (
//       <div style={{ 
//         width: 500, 
//         height: 500 
//         }} 
//         id={this.props.id} 
          
//         />
//     );
//   }
// }

// export default Map