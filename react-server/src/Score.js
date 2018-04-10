import axios from 'axios';
import React, { Component } from 'react';

import Home from './Home';
import ScoreTable from './ScoreTable';

import communityresourcesImg from './images/communityresources.png';
import crossroads from './images/crossroads.png';
import info from './images/info.png';
import intersectionsImg from './images/intersections.png';
// import m1 from './images/m1.png';
// import m2 from './images/m2.png';
// import m3 from './images/m3.png';
// import m4 from './images/m4.png';
// import m5 from './images/m5.png';
import transitstopsImg from './images/transitstops3.png';

export default class Score extends Component {

  constructor(props) {
    super(props);
    this.state = {
      services: {},
      area: null,
      streetNetwork: null, // count
      communityResources: null, // count
      transitStops: null, // count
      showMarkers: null,
      hideMarkers: null
    },
    // console.log('initializing MapContainer constructor');
    this.handleClick = this.handleClick.bind(this);
    this.initMapAndMarker = this.initMapAndMarker.bind(this);
  }

  componentDidMount() {
    // console.log('in MapContainer componentDidMount');
    if (this.props.address) {
      // this.initMapAndMarker(this.props.address);
      const { showMarkers, hideMarkers} = this.initMapAndMarker(this.props.address);
      this.setState({
        showMarkers: showMarkers,
        hideMarkers: hideMarkers,
        // area: null,
        // streetNetwork: null, // count
        // communityResources: null, // count
        // transitStops: null, // count
      });
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log('in MapContainer componentWillReceiveProps', nextProps);
    if (this.props.address.id !== nextProps.address.id) {
    // this.initMapAndMarker(nextProps.address);
      const { showMarkers, hideMarkers} = this.initMapAndMarker(nextProps.address);
      this.setState({
        showMarkers: showMarkers,
        hideMarkers: hideMarkers,
        communityResources: null, // count
      });
    }
  }

  handleClick(value) {
    let criteriaClicked = this.state.criteriaClicked;
    if (criteriaClicked.includes(value)) {
      criteriaClicked = criteriaClicked.filter(criterion => criterion !== value);
    } else {
      criteriaClicked.push(value);
    }
    this.setState({ criteriaClicked: criteriaClicked });
  }

  initMapAndMarker(address) {
    const googleMaps = window.google.maps;
    const MarkerClusterer = window.MarkerClusterer;
    const location = { lat: address.lat, lng: address.lng };

    const map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: location,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
          'styled_map']
      }
    });

    const marker = new googleMaps.Marker({
      position: location,
      map: map,
    });

    const circle = new googleMaps.Circle({
      strokeWeight: 0,
      fillColor: '#87cefa',
      fillOpacity: 0.25,
      map: map,
      center: location,
      radius: 800
    });

    const circle2 = new googleMaps.Circle({
      strokeWeight: 0,
      fillColor: '#87cefa',
      fillOpacity: 0.25,
      map: map,
      center: location,
      radius: 400
    });

    const styledMapType = new googleMaps.StyledMapType(
      [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6195a0"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": "0"
                },
                {
                    "saturation": "0"
                },
                {
                    "color": "#f5f5f2"
                },
                {
                    "gamma": "1"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "-3"
                },
                {
                    "gamma": "1.00"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#bae5ce"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#fac9a9"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#4e4e4e"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#787878"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "hue": "#0a00ff"
                },
                {
                    "saturation": "-77"
                },
                {
                    "gamma": "0.57"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#43321e"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "hue": "#ff6c00"
                },
                {
                    "lightness": "4"
                },
                {
                    "gamma": "0.75"
                },
                {
                    "saturation": "-68"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#eaf6f8"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c7eced"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "lightness": "-49"
                },
                {
                    "saturation": "-53"
                },
                {
                    "gamma": "0.79"
                }
            ]
        }
    ],
      { name: 'Styled Map' });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    const drawingManager = new googleMaps.drawing.DrawingManager({
      drawingMode: googleMaps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: googleMaps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      }
    });

    drawingManager.setMap(map);

    googleMaps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
      const area = googleMaps.geometry.spherical.computeArea(polygon.getPath());
      console.log('polygon complete, area is ', Math.ceil(area), 'square meters');
      if (this.state.area) {
        const newArea = this.state.area + Math.ceil(area);
        this.setState({ area: newArea });
      } else {
        this.setState({ area: Math.ceil(area) });
      }
    });

    let services = this.state.services;
    // const markerCluster = new MarkerClusterer(map, markersList,
    // { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    // const addNewMarker = MarkerClusterer.prototype.addMarker.bind(markerCluster);
    const service = new googleMaps.places.PlacesService(map);

    let serviceList = [];
    const showService = (type, label) => {
      const request = {
        location: location,
        radius: '800',
        type: type
      };
      const callback = (results, status, pagination) => {
        if (status !== googleMaps.places.PlacesServiceStatus.OK) return;
        results.forEach((place) => {
          console.log('going to run filterDistance');
          filterDistance(place, label);
        });
        if (pagination.hasNextPage) {
          pagination.nextPage();
        };
      }
      service.nearbySearch(request, callback);
      // markerCluster.redraw();
    }


    const filterDistance = (place, label)=>{
      //prepare data&function in search
      const origins = [`${address.lat},${address.lng}`];
      const destinations = [`${place.geometry.location.lat()},${place.geometry.location.lng()}`];
      const distanceService = new googleMaps.DistanceMatrixService();
      const checkDistance = distanceService.__proto__.getDistanceMatrix.bind(distanceService);
      const request = {
        origins: origins,
        destinations: destinations,
        travelMode: 'WALKING',
        unitSystem: googleMaps.UnitSystem.METRIC
      }
      const callback = (response, status) => {
        if (status === 'OK') {
          console.log(response.rows[0].elements[0].distance.value);
          if (response.rows[0].elements[0].distance.value < 800) {
            createMarker(place);
            countService(services, label);
          }
        }

      }
      checkDistance(request, callback);

    };

    const createMarker = (place, label)=>{
      const marker = new googleMaps.Marker({
        icon: communityresourcesImg,
        position: place.geometry.location
      });
      const infowindow = new googleMaps.InfoWindow();
      googleMaps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
      serviceList.push(marker);
      // addNewMarker(marker, false);
    };

    const countService = (services, label) => {
      if (services[label]) {
        // services[label] += data.length;
        services[label] += 1;
        // let communityResources = this.state.communityResources + data.length;
        let communityResources = this.state.communityResources + 1;
        this.setState({ services, communityResources });
        return;
      }
      // services[label] = data.length;
      services[label] = 1;
      // let communityResources = this.state.communityResources + data.length;
      let communityResources = this.state.communityResources + 1;
      this.setState({ services, communityResources });
      return;
    }

    let transitStopMarkers = [];
    const showTransit = (type, label) => {
      const request = {
        location: location,
        radius: '400',
        type: type
      };
      const callback = (results, status, pagination) => {
        if (status !== googleMaps.places.PlacesServiceStatus.OK) return;
        results.forEach((place) => {
          const marker = new googleMaps.Marker({
            icon: transitstopsImg,
            position: place.geometry.location
          });
          const infowindow = new googleMaps.InfoWindow();
          googleMaps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
          });
          transitStopMarkers.push(marker);
        });
        if (pagination.hasNextPage) {
          pagination.nextPage();
        };
        if (!this.state.transitStops){
          this.setState({ transitStops: results.length });
        } else {
          const newStopsNum = this.state.transitStops + results.length;
          this.setState({ transitStops: newStopsNum});
        }

      };
      service.nearbySearch(request, callback);
    }

    showTransit(['transit_station'], 'Intersections');
    console.log('transitStopMarkers', transitStopMarkers);

    // // TODO: Food Retail
    // // TODO: Grocery with produce section
    // // TODO: Community - Serving Retail
    // // TODO: Farmers Market
    // // TODO: Other Retail
    // // TODO: Services
    // // TODO: Civic and Community Facilities
    // // TODO: Adult or senior care(licensed)
    // // TODO: Child care(licensed)
    // // TODO: Community or recreation center
    // // TODO: Social services center

      showService(['supermarket'], 'Supermarket');
      // showService(['department_store', 'clothing_store'], 'Clothing store/department store selling clothes');
      // showService(['convenience_store'], 'Convenience Store');
      // showService(['hardware_store'], 'Hardware Store');
      // showService(['pharmacy'], 'Pharmacy');
      // showService(['bank'], 'Bank');
      // showService(['gym'], 'Gym, health club, exercise studio');
      // showService(['hair_care'], 'Hair care');
      // showService(['laundry'], 'Laundry/dry cleaner');
      // showService(['bar', 'cafe', 'restaurant'], 'Restaurant/café/diner');
      // showService(['restaurant'], 'Restaurant/café/diner');
      // showService(['art_gallery', 'museum'], 'Cultural arts facility');
      // showService(['school'], 'Education facility');
      // showService(['bowling_alley', 'movie_theater'], 'Family entertainment venue');
      // showService(['local_government_office', 'city_hall'], 'Government office serving public on-site');
      // showService(['hospital', 'physiotherapist', 'dentist', 'doctor',], 'Medical clinic/office');
      // showService(['church'], 'Place of worship');
      // showService(['police', 'fire_station'], 'Police or fire station');
      // showService(['post_office'], 'Post office');
      // showService(['library'], 'Public library');
      // showService(['park'], 'Public park');
    // }

    // get all ways around a certain address
    let intersectionMarkers = [];
    axios.get(`http://overpass-api.de/api/interpreter?[out:json];way(around:400,${address.lat},${address.lng});out;`)
      .then(results => {
        results = results.data.elements.filter(element => {
          return element.hasOwnProperty('tags') &&
            element.tags.hasOwnProperty('highway') &&
            !element.tags.hasOwnProperty('bridge') &&
            !(element.tags.hasOwnProperty('service') && (element.tags.service === 'parking_aisle' || element.tags.service === 'driveway' || element.tags.service === 'alley')) &&
            element.tags.highway !== 'cycleway' &&
            element.tags.highway !== 'footway'
        })
        return results;
      })
      // remove duplicate nodes within a certain way
      // to prep data for the next step
      .then(elements => {
        elements.forEach(element => {
          element.nodes = element.nodes.sort().filter((node, pos, array) => {
            return !pos || node !== array[pos-1];
          })
        });
        return elements;
      })
      // put all nodes in one array
      // filter out all nodes that only appear once
      // output a list of unique node ids
      .then(newElements => {
        let nodes = {};

        newElements.forEach(newElement => {
          newElement.nodes.forEach(node => {
            if (!nodes.hasOwnProperty(node)) {
              nodes[node] = [newElement.tags.name? newElement.tags.name : newElement.id];
            } else {
              nodes[node].push(newElement.tags.name? newElement.tags.name : newElement.id);
            }
          })
        })

        let list = [];
        for (let node in nodes) {
          nodes[node] = nodes[node].filter((item, index, array) => {
            return !(array.indexOf(item) === index && array.lastIndexOf(item) !== index);
          });
          if (nodes[node].length > 1) {
            list.push(node);
          }
        }

        return list;
      })
      .then(nodes => {
        let intersections = [];

        axios.get(`http://overpass-api.de/api/interpreter?[out:json];node(around:400,${address.lat},${address.lng});out;`)
          .then(results => {
            intersections = results.data.elements.filter(element => {
              return nodes.indexOf(element.id.toString()) !== -1;
            });
            // console.log(intersections);
            return intersections;
          })
          .then(intersections => {
            intersections.forEach(intersection => {
              // console.log(typeof intersection.lat);
              const intersectionMarker = new googleMaps.Marker({
                // map: map,
                icon: intersectionsImg,
                position: { lat: intersection.lat, lng: intersection.lon }
              });
              intersectionMarkers.push(intersectionMarker);
            })
            this.setState({ streetNetwork: intersections.length });
          })
      })
    // console.log('intersectionMarkers', intersectionMarkers);

    return {
      showMarkers: (targetArray) => {
        switch (targetArray) {
          case 'street_network':
            // console.log('in showMarkers ', targetArray)
            intersectionMarkers.forEach((marker) => {
              marker.setMap(map);
            });
            break;
          case 'community_resources':
            console.log('in showMarkers markerCluster', serviceList);
            // markerCluster.getMarkers().forEach((marker) => {
            //   marker.setMap(map);
            // });
            serviceList.forEach((marker) => {
              marker.setMap(map);
            });
            break;
          case 'transit_stops':
            transitStopMarkers.forEach((marker) => {
              marker.setMap(map);
            });
            break;
          default: break;
        }
      },
      hideMarkers: (targetArray) => {
        switch (targetArray) {
          case 'street_network':
            // console.log('in showMarkers ', targetArray)
            intersectionMarkers.forEach((marker) => {
              marker.setMap(null);
            });
            break;
          case 'community_resources':
            console.log('in showMarkers markerCluster', serviceList);
            // markerCluster.getMarkers().forEach((marker) => {
            //   marker.setMap(null);
            // });
            serviceList.forEach((marker) => {
              marker.setMap(null);
            });
            break;
          case 'transit_stops':
            transitStopMarkers.forEach((marker) => {
              marker.setMap(null);
            });
            break;
          default: break;
        }
      }
    }
  }

  render() {
    return (
      <div className="mapContainer container mt-2">
        <div className="row">
          <div className="col-lg-8 col-md-12 pl-0">
            <div id='map' style={{ height: `88vh`, width: `100%` }} />
          </div>
          <div id="tableDiv" className="col-lg-4 col-md-12 pr-0">
            <ScoreTable address={this.props.address}
                        area={this.state.area}
                        criteriaClicked={this.state.criteriaClicked}
                        handleClick={this.handleClick}
                        streetNetwork={this.state.streetNetwork}
                        communityResources={this.state.communityResources}
                        services={this.state.services}
                        transitStops={this.state.transitStops}
                        showMarkers={this.state.showMarkers}
                        hideMarkers={this.state.hideMarkers} />
          </div>
        </div>
      </div>
      );
  }

}