// mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bvb2t5dmVydCIsImEiOiJjanV3dTVlN2IwZ2JoNGRtd3E0dDR3aTRmIn0.U6xgLfZwmMCTrf5PHSbYkQ'; // replace this with your access token
// const map = new mapboxgl.Map({
// 	container: 'map',
// 	style: 'your-style-URL-here', // replace this with your style URL
// 	center: [-87.661557, 41.893748],
// 	zoom: 10.7
// });
// // code from the next step will go here
// map.on('click', function(e) {
// 	let features = map.queryRenderedFeatures(e.point, {
// 		layers: ['layer-name-here'] // replace this with the name of the layer
// 	});
//
// 	if (!features.length) {
// 		return;
// 	}
//
// 	let feature = features[0];
//
// 	let popup = new mapboxgl.Popup({
// 			offset: [0, -15]
// 		})
// 		.setLngLat(feature.geometry.coordinates)
// 		.setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
// 		.setLngLat(feature.geometry.coordinates)
// 		.addTo(map);
// });
