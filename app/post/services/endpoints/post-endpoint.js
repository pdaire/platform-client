module.exports = [
    '$resource',
    '$rootScope',
    'Util',
    '_',
function (
    $resource,
    $rootScope,
    Util,
    _
) {

    var PostEndpoint = $resource(Util.apiUrl('/posts/:id/:extra'), {
        id: '@id',
        order: 'desc',
        orderby: 'created'
    }, {
        query: {
            method: 'GET',
            isArray: false,
            paramSerializer: '$httpParamSerializerJQLike'
        },
        get: {
            method: 'GET',
            transformResponse: function (data /*, header*/) {
                data = angular.fromJson(data);
                // Ensure values is always an object
                if (_.isArray(data.values)) {
                    data.values = _.object(data.values);
                }
                return data;
            }
        },
        update: {
            method: 'PUT'
        },
        options: {
            method: 'OPTIONS'
        },
        geojson: {
            method: 'GET',
            url: Util.apiUrl('/posts/:id/geojson'),
            isArray: false,
            paramSerializer: '$httpParamSerializerJQLike'
        },
        stats: {
            method: 'GET',
            url: Util.apiUrl('/posts/:id/stats'),
            isArray: false,
            paramSerializer: '$httpParamSerializerJQLike'
        },
        collections: {
            method: 'GET',
            url: Util.apiUrl('/posts/:id/collections'),
            isArray: true
        }

    });

    $rootScope.$on('event:authentication:logout:succeeded', function () {
        PostEndpoint.query();
    });

    return PostEndpoint;

}];
