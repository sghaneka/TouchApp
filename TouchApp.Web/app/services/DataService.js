(function(angular) {
    angular
        .module('Touch')
        .factory('DataService', DataService); 

    DataService.$inject = ['$http', '$q'];

    // clean it up...

    function DataService($http, $q) {
        var service = {
            getPlayList: getPlayList,
            getImageList: getImageList,
            getTracksForPlayList: getTracksForPlayList,
            addPlayList: addPlayList,
            addImage: addImage,
            addTrack: addTrack
        }

        return service;

        function addPlayList(playListName) {
            
            return $http({
                method: 'Post',
                url: 'api/PlayList',
                data: {
                    name: playListName
                }
            })
                .then(sendResponseData)
                .catch(sendError);
        }

        function addTrack(trackToAdd) {
            debugger;
            return $http({
                method: 'Post',
                url: 'api/Tracks',
                data: trackToAdd
            })
            .then(sendResponseData)
            .catch(sendError);
        }

        function addImage(image) {
            return $http({
                method: 'Post',
                url: 'api/Image/Add',
                data: {
                    name: image.name,
                    imageUrl: image.url
                }
            })
            .then(sendResponseData)
            .catch(sendError);
        }

        function getPlayList() {
            return $http({
                method: 'GET',
                url: 'api/PlayList'
            })
            .then(sendResponseData)
            .catch(sendError);
        }

        function getImageList() {
            return $http({
                method: 'GET',
                url: 'api/Images/ImageList'
            })
            .then(sendResponseData)
            .catch(sendError);
        }

        function getTracksForPlayList(playListId) {
            return $http({
                method: 'GET',
                url: 'api/Tracks/PlayList/'+playListId
            })
            .then(sendResponseData)
            .catch(sendError);
        }

        function sendResponseData(response) {
            return response.data;
        }

        function sendError(response) {
            return $q.reject('Error retrieving response. (HTTP status: ' + response.status + ')');
        }

        function getVideos2() {
            return [ {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'cRDcTjWvzZA',
                randomOn: true,
                startTime: '0:01',
                name: 'Brushing My Teeth'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'CSg3gsuLm3o',
                randomOn: true,
                startTime: '0:17',
                name: 'Growing'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'XSRND1Ol3eY',
                randomOn: true,
                startTime: '0:01',
                name: 'I Love you'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'AsAzI4Jdsj0',
                randomOn: true,
                startTime: '0:12',
                name: 'Wheels on the bus'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'cSv1k5R_wos',
                randomOn: true,
                startTime: '0:01',
                name: 'London Bridge'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'iP9z-PZ8bp8',
                randomOn: true,
                startTime: '0:01',
                name: 'Introduction'
            },{
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'F7F3cH4Rukg',
                randomOn: true,
                startTime: '0:18',
                name: 'Ants'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'AaUWLQ052HY',
                randomOn: true,
                startTime: '0:06',
                name: 'Raindrops'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'aE_Bj32LmSs',
                randomOn: true,
                startTime: '0:08',
                name: 'Clapping'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'u6ftdHjkZaQ',
                randomOn: true,
                startTime: '0:10',
                name: 'Twinkle Twinkle'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'AkAOeIMypg8',
                randomOn: true,
                startTime: '0:15',
                name: 'Green grass'
            }]
        }

        function getVideos1() {
            return [{
                imagePath: '/Content/music_images/taylor_swift.jpg',
                videoId: 'e-ORhEE9VVg',
                playListId: 'RDEMb1vAi4rwXXeDlr7NZ68C_w',
                startTime: '0:10',
                name: 'Taylor Swift'
            }, {
                imagePath: '/Content/music_images/katyperry.jpg',
                videoId: '7RMQksXpQSk',
                playListId: 'PLwn8mT6-a4yJ5BzBJ9fdnYYvyW5tftKDE',
                startTime: '0:10',
                name: 'Katy Perry'
            }, {
                imagePath: '/Content/music_images/hoopla_kidz.jpg',
                videoId: 'KhE5ElwC4Us',
                startTime: '0:10',
                name: 'Hoopla Kidz'
            }, {
                imagePath: '/Content/music_images/lungi_dance.jpg',
                videoId: '2kWLyInyjOE',
                startTime: '0:20',
                name: 'Lungi dance'
            }, {
                imagePath: '/Content/music_images/nagada.jpg',
                videoId: 'vK5E_aeBGYA',
                startTime: '0:20',
                name: 'Naga song'
            }, {
                imagePath: '/Content/music_images/one_two_three_four.jpg',
                videoId: 'QggsVF0DvDU',
                startTime: '0:20',
                name: '1 2 3 4 dance floor'
            }, {
                imagePath: '/Content/music_images/hookah_bar.jpg',
                videoId: 'AihilcnejBA',
                startTime: '0:20',
                name: 'hookah bar'
            }, {
                imagePath: '/Content/music_images/black-eyed-peas.jpg',
                videoId: 'I7HahVwYpwo',
                startTime: '0:30',
                name: 'meet me half way'
            },{
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'cRDcTjWvzZA',
                relatedIds: ['CSg3gsuLm3o', 'XSRND1Ol3eY', '7OZvh9WaNMo', 'AsAzI4Jdsj0', 'cSv1k5R_wos', 'iP9z-PZ8bp8'],
                startTime: '0:01',
                name: 'Brushing My Teeth'
            },{
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'CSg3gsuLm3o',
                relatedIds: ['cRDcTjWvzZA', 'XSRND1Ol3eY', '7OZvh9WaNMo', 'AsAzI4Jdsj0', 'cSv1k5R_wos', 'iP9z-PZ8bp8'],
                startTime: '0:17',
                name: 'Growing'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'XSRND1Ol3eY',
                relatedIds: ['cRDcTjWvzZA', 'CSg3gsuLm3o', '7OZvh9WaNMo', 'AsAzI4Jdsj0', 'cSv1k5R_wos', 'iP9z-PZ8bp8'],
                startTime: '0:01',
                name: 'I Love you'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'AsAzI4Jdsj0',
                relatedIds: ['cRDcTjWvzZA', 'CSg3gsuLm3o', '7OZvh9WaNMo', 'XSRND1Ol3eY', 'cSv1k5R_wos', 'iP9z-PZ8bp8'],
                startTime: '0:12',
                name: 'Wheels on the bus'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'cSv1k5R_wos',
                startTime: '0:01',
                relatedIds: ['cRDcTjWvzZA', 'CSg3gsuLm3o', '7OZvh9WaNMo', 'XSRND1Ol3eY', 'AsAzI4Jdsj0', 'iP9z-PZ8bp8'],
                name: 'London Bridge'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'iP9z-PZ8bp8',
                startTime: '0:01',
                relatedIds: ['cRDcTjWvzZA', 'CSg3gsuLm3o', '7OZvh9WaNMo', 'XSRND1Ol3eY', 'AsAzI4Jdsj0', 'cSv1k5R_wos'],
                name: 'Introduction'
            }]
        }

        function getVideos() {
            return [
            {
                imagePath: '/Content/music_images/taylor_swift.jpg',
                videoId: 'e-ORhEE9VVg',
                playListId: 'RDEMb1vAi4rwXXeDlr7NZ68C_w',
                startTime: '0:10',
                name: 'Taylor Swift'
            }, {
                imagePath: '/Content/music_images/katyperry.jpg',
                videoId: '7RMQksXpQSk',
                playListId: 'PLwn8mT6-a4yJ5BzBJ9fdnYYvyW5tftKDE',
                startTime: '0:10',
                name: 'Katy Perry'
            }, {
                imagePath: '/Content/music_images/hoopla_kidz.jpg',
                videoId: 'KhE5ElwC4Us',
                startTime: '0:10',
                name: 'Hoopla Kidz'
            }, {
                imagePath: '/Content/music_images/lungi_dance.jpg',
                videoId: '2kWLyInyjOE',
                startTime: '0:20',
                name: 'Lungi dance'
            }, {
                imagePath: '/Content/music_images/nagada.jpg',
                videoId: 'vK5E_aeBGYA',
                startTime: '0:20',
                name: 'Naga song'
            }, {
                imagePath: '/Content/music_images/one_two_three_four.jpg',
                videoId: 'QggsVF0DvDU',
                startTime: '0:20',
                name: '1 2 3 4 dance floor'
            }, {
                imagePath: '/Content/music_images/hookah_bar.jpg',
                videoId: 'AihilcnejBA',
                startTime: '0:20',
                name: 'hookah bar'
            }, {
                imagePath: '/Content/music_images/black-eyed-peas.jpg',
                videoId: 'I7HahVwYpwo',
                startTime: '0:30',
                name: 'meet me half way'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: '8m3PCZft-tg',
                startTime: '14:41',
                endTime: '15:50',
                name: 'Growing'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'ya4yyg9XiI4',
                name: 'Mr sun'
            }, {
                imagePath: '/Content/music_images/barney.jpg',
                videoId: 'EAzebcaIIRU',
                name: 'Barney Theme'
            }
            ];   /*  5:31,6:41 */
        }
    }


})(angular);