import axios from 'axios';
import React, { Component } from 'react';

import Home from './Home';
import ScoreTable from './ScoreTable';

import crossroads from './images/crossroads.png';
import info from './images/info.png';

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
      this.setState({ showMarkers: showMarkers, hideMarkers: hideMarkers});
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log('in MapContainer componentWillReceiveProps', nextProps);
    // if (this.props.address !== nextProps.address) {
    // this.initMapAndMarker(nextProps.address);
    const { showMarkers, hideMarkers} = this.initMapAndMarker(nextProps.address);
    this.setState({ showMarkers: showMarkers, hideMarkers: hideMarkers});
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
      // mapTypeControlOptions: {
      //   mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
      //     'styled_map']
      // }
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

    // const styledMapType = new googleMaps.StyledMapType(
    //   [
    //     { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
    //     { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
    //     { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
    //     {
    //       featureType: 'administrative',
    //       elementType: 'geometry.stroke',
    //       stylers: [{ color: '#c9b2a6' }]
    //     },
    //     {
    //       featureType: 'administrative.land_parcel',
    //       elementType: 'geometry.stroke',
    //       stylers: [{ color: '#dcd2be' }]
    //     },
    //     {
    //       featureType: 'administrative.land_parcel',
    //       elementType: 'labels.text.fill',
    //       stylers: [{ color: '#ae9e90' }]
    //     },
    //     {
    //       featureType: 'landscape.natural',
    //       elementType: 'geometry',
    //       stylers: [{ color: '#dfd2ae' }]
    //     },
    //     {
    //       featureType: 'poi',
    //       elementType: 'geometry',
    //       stylers: [{ color: '#dfd2ae' }]
    //     },
    //     {
    //       featureType: 'poi',
    //       elementType: 'labels.text.fill',
    //       stylers: [{ color: '#93817c' }]
    //     },
    //     {
    //       featureType: 'poi.park',
    //       elementType: 'geometry.fill',
    //       stylers: [{ color: '#a5b076' }]
    //     },
    //     {
    //       featureType: 'poi.park',
    //       elementType: 'labels.text.fill',
    //       stylers: [{ color: '#447530' }]
    //     },
    //     {
    //       featureType: 'road',
    //       elementType: 'geometry',
    //       stylers: [{ color: '#f5f1e6' }]
    //     },
    //     {
    //       featureType: 'road.arterial',
    //       elementType: 'geometry',
    //       stylers: [{ color: '#fdfcf8' }]
    //     },
    //     {
    //       featureType: 'road.highway',
    //       elementType: 'geometry',
    //       stylers: [{ color: '#f8c967' }]
    //     },
    //     {
    //       featureType: 'road.highway',
    //       elementType: 'geometry.stroke',
    //       stylers: [{ color: '#e9bc62' }]
    //     },
    //     {
    //       featureType: 'road.highway.controlled_access',
    //       elementType: 'geometry',
    //       stylers: [{ color: '#e98d58' }]
    //     },
    //     {
    //       featureType: 'road.highway.controlled_access',
    //       elementType: 'geometry.stroke',
    //       stylers: [{ color: '#db8555' }]
    //     },
    //     {
    //       featureType: 'road.local',
    //       elementType: 'labels.text.fill',
    //       stylers: [{ color: '#806b63' }]
    //     },
    //     {
    //       featureType: 'transit.line',
    //       elementType: 'geometry',
    //       stylers: [{ color: '#dfd2ae' }]
    //     },
    //     {
    //       featureType: 'transit.line',
    //       elementType: 'labels.text.fill',
    //       stylers: [{ color: '#8f7d77' }]
    //     },
    //     {
    //       featureType: 'transit.line',
    //       elementType: 'labels.text.stroke',
    //       stylers: [{ color: '#ebe3cd' }]
    //     },
    //     {
    //       featureType: 'transit.station',
    //       elementType: 'geometry',
    //       stylers: [{ color: '#dfd2ae' }]
    //     },
    //     {
    //       featureType: 'water',
    //       elementType: 'geometry.fill',
    //       stylers: [{ color: '#b9d3c2' }]
    //     },
    //     {
    //       featureType: 'water',
    //       elementType: 'labels.text.fill',
    //       stylers: [{ color: '#92998d' }]
    //     }
    //   ],
    //   { name: 'Styled Map' });

    // map.mapTypes.set('styled_map', styledMapType);
    // map.setMapTypeId('styled_map');

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
      this.setState({ area: Math.ceil(area) });
    });

    let markersList = [];
    let services = this.state.services;
    const markerCluster = new MarkerClusterer(map, markersList, { ignoreHidden: false },
      { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
    );
    const addNewMarker = MarkerClusterer.prototype.addMarker.bind(markerCluster);
    const setMarkerMap = MarkerClusterer.prototype.setMap.bind(markerCluster);
    console.log('markerCluster ', markerCluster);
    console.log('setMarkerMap ', setMarkerMap);
    const service = new googleMaps.places.PlacesService(map);

    const showService = (type, label) => {
      const request = {
        location: location,
        radius: '800',
        type: type
      };
      const callback = (results, status, pagination) => {
        if (status !== googleMaps.places.PlacesServiceStatus.OK) return;
        countService(services, label, results);
        results.forEach((place) => {
          console.log('going to run filterDistance');
          filterDistance(place);
        });
        if (pagination.hasNextPage) {
          pagination.nextPage();
        };
      }
      service.nearbySearch(request, callback);
      // markerCluster.redraw();
    }

    const createMarker = (place)=>{
      const marker = new googleMaps.Marker({
        icon: info,
        position: place.geometry.location
      });
      const infowindow = new googleMaps.InfoWindow();
      googleMaps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
      addNewMarker(marker);

    };

    const filterDistance = (place)=>{
      //prepare data&function in search
      console.log('in filterDistance');
      
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
      console.log('request in filterDistance', request);
      const callback = (response, status) => {
        if (status === 'OK') {
          console.log('callback in filterDistance', response);
          const origins = response.originAddresses;
          const destinations = response.destinationAddresses;

          for (let i = 0; i < origins.length; i++) {
            let results = response.rows[i].elements;
            for (let j = 0; j < results.length; j++) {
              let element = results[j];
              let value = element.distance.value;
              console.log(value);
              //if distance is qualified, create marker;
              if (value <= 800){
                createMarker(place);
              }
            }
          }
        }
      }
      checkDistance(request, callback);

    };

    const countService = (services, label, data) => {
      
      if (services[label]) {
        services[label] += data.length;
        let communityResources = this.state.communityResources + data.length;
        this.setState({ services, communityResources });
        return;
      }
      services[label] = data.length;
      let communityResources = this.state.communityResources + data.length;
      this.setState({ services, communityResources });
    }

    let transitStopMarkers = [];
    const showTransit = (type, label) => {
      const request = {
        location: location,
        radius: '400',
        type: type
      };
      const callback = (results, status) => {
        if (status !== googleMaps.places.PlacesServiceStatus.OK) return;
        // countService(services, label, results);
        results.forEach((place) => {
          const marker = new googleMaps.Marker({
            // map: map,
            icon: crossroads,
            position: place.geometry.location
          });
          const infowindow = new googleMaps.InfoWindow();
          googleMaps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
          });
          transitStopMarkers.push(marker);
        });
        this.setState({ transitStops: results.length });

      };
      service.nearbySearch(request, callback);
    }
    
    showTransit(['transit_station'], 'Intersections');
    // console.log('transitStopMarkers', transitStopMarkers);
    
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
    
    // if (criteriaClicked.includes('community_resources')) {
      showService(['supermarket'], 'Supermarket');
    //   showService(['department_store', 'clothing_store'], 'Clothing store/department store selling clothes');
      showService(['convenience_store'], 'Convenience Store');
    //   showService(['hardware_store'], 'Hardware Store');
    //   showService(['pharmacy'], 'Pharmacy');
    //   showService(['bank'], 'Bank');
    //   showService(['gym'], 'Gym, health club, exercise studio');
    //   showService(['hair_care'], 'Hair care');
    //   showService(['laundry'], 'Laundry/dry cleaner');
    //   showService(['bar', 'cafe', 'restaurant'], 'Restaurant/café/diner');
    //   showService(['art_gallery', 'museum'], 'Cultural arts facility');
    //   showService(['school'], 'Education facility');
    //   showService(['bowling_alley', 'movie_theater'], 'Family entertainment venue');
    //   showService(['local_government_office', 'city_hall'], 'Government office serving public on-site');
    //   showService(['hospital', 'physiotherapist', 'dentist', 'doctor',], 'Medical clinic/office');
    //   showService(['church'], 'Place of worship');
    //   showService(['police', 'fire_station'], 'Police or fire station');
    //   showService(['post_office'], 'Post office');
    //   showService(['library'], 'Public library');
    //   showService(['park'], 'Public park');
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
                icon: crossroads,
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
            // console.log('in showMarkers ', markersList);
            console.log('in showMarkers markerCluster.getMarkers()', markerCluster.getMarkers());
            // console.log('in showMarkers markerCluster', markerCluster);
            // markerCluster.setMap(map);
            // markersList.forEach((marker) => {
            //   marker.setMap(map);
            // });
            // markerCluster.getMarkers().setVisible(true);
            // markerCluster.repaint();
            
            
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
            // console.log('in showMarkers markersList', markersList);
            console.log('in showMarkers markerCluster.getMarkers()', markerCluster.getMarkers());
            // console.log('in showMarkers markerCluster', markerCluster);
            // markerCluster.setMap(null);
            // markersList.forEach((marker) => {
            //   marker.setMap(null);
            // });
            // markerCluster.getMarkers().setVisible(false);
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
      <div className="container mt-2">
        <div className="row">
          <div className="col-8 pl-0">
            <div id='map' style={{ height: `600px`, width: `100%` }} />
          </div>
          <div id="tableDiv" className="col-4 pr-0">
            <ScoreTable criteriaClicked={this.state.criteriaClicked} handleClick={this.handleClick} streetNetwork={this.state.streetNetwork} communityResources={this.state.communityResources} transitStops={this.state.transitStops} showMarkers={this.state.showMarkers} hideMarkers={this.state.hideMarkers} />
          </div>
        </div>
      </div>
      );
  }

}