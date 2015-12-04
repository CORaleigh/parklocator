'use strict';

angular.module('parkLocator').controller('mapCtrl', ['$scope', 'mapService', 'parkService', 'amenitiesService', 'uiGmapGoogleMapApi', 'uiGmapIsReady',
	function($scope, mapService, parkService, amenitiesService, gMapsAPI, uiGmapIsReady){

	// Map settings
  $scope.map = mapService.map;
  $scope.map.parkMarkers = parkService.markers;
  $scope.activities = amenitiesService.list.activitiesPos;
  $scope.selectedActivities = amenitiesService.selectedActivities;

  $scope.$watch('activities.window.model', function () { console.log($scope.activities.window); });

  $scope.$watchCollection('selectedActivities.current', parkService.updateParkMarkers );

  $scope.noIndigestion = [];

  $scope.showMarkers = function () {
    return ($scope.map.zoom >= 16) ? $scope.activities.markers : $scope.noIndigestion;
  };

  var mapInstance,
      mapsApi;

  gMapsAPI.then( function (maps) {
  	mapsApi = maps;
  });

  uiGmapIsReady.promise(1).then(function(instances) {
    mapInstance = instances[0].map;
    applyMapStyles();
  });

  var applyMapStyles = function () {
  	var styledMap = new mapsApi.StyledMapType( $scope.map.options.styles, {name: 'Nature'});
		mapInstance.mapTypes.set('nature', styledMap);
	  mapInstance.setMapTypeId('nature');
  };

}]);