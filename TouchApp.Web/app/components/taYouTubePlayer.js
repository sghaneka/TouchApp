(function (angular) {

    angular
        .module('Touch')
        .directive('taYouTubePlayer', taYouTubePlayer);

    taYouTubePlayer.$inject = ['$timeout', '$window'];

    function taYouTubePlayer($timeout, $window) {

        return {
            restrict: 'E',
            link: link,
            templateUrl: '/app/components/taYouTubePlayer.html',
            scope: {
                height: "@",
                width: "@",
                video: "=",
                randomMode: '='
            },
            controller: YouTubePlayerController
        }

        function link(scope, element, attrs) {

            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var player;
            var done = false;

            var timer = null;

            $window.onYouTubeIframeAPIReady = function () {
                player = new YT.Player('myPlayer', {
                    playerVars: {
                        autoplay: 0,
                        html5: 1,
                        theme: "light",
                        modesbranding: 0,
                        color: "white",
                        iv_load_policy: 3,
                        showinfo: 1,
                        controls: 1
                    },

                    height: 170,
                    width: 700,

                    events: {
                        'onStateChange': function (event) {
                            console.log('on state changed...');
                            switch (event.data) {
                                case YT.PlayerState.UNSTARTED:
                                    scope.$apply(function () {
                                        scope.playerState = YT.PlayerState.UNSTARTED;
                                    });
                                    
                                    console.log('unstarted');
                                    break;
                                case YT.PlayerState.ENDED:
                                    scope.$apply(function () {
                                        scope.showPlayer = false;
                                    });
                                    //toastr.info('ended');
                                    console.log('ended');
                                    scope.$apply(function () {
                                        scope.playerState = YT.PlayerState.ENDED;
                                    });
                                    break;
                                case YT.PlayerState.PLAYING:
                                    //toastr.info('playing');
                                    console.log('playing');                                    
                                    scope.$apply(function () {
                                        scope.showPlayer = true;
                                        scope.playerState = YT.PlayerState.PLAYING;
                                    });
                                    break;
                                case YT.PlayerState.PAUSED:
                                    console.log('paused');
                                    scope.$apply(function () {
                                        scope.playerState = YT.PlayerState.PAUSED;
                                    });
                                    break;
                                case YT.PlayerState.BUFFERING:
                                   // toastr.info('buffering');
                                    console.log('buffering');
                                    break;
                                case YT.PlayerState.CUED:
                                   // toastr.info('video cued');
                                    console.log('video cued');
                                    break;
                            }
                        },
                        'onReady': function (event) {
                            console.log('on player ready....');
                        }
                    }
                });
            };

            function showHidePlayer(showState) {
                var tmp = element.find('iframe');
                if (showState) {
                    tmp.show();
                } else {
                    tmp.hide();
                }
            }

            scope.playClicked = function () {
                player.playVideo();
            }

            scope.pauseClicked = function () {
                player.pauseVideo();           
            }

            scope.nextClicked = function () {
                player.nextVideo();
            }

            scope.previousClicked = function () {
                player.previousVideo();
            }
            
            scope.$on('clickHit', function (event, args) {
                var newValue = args.message.currentVideo;
                
                scope.showPlayer = true;
                player.stopVideo();
                var currentVideoId = null;
                if (timer)
                {
                    $timeout.cancel(timer);
                    timer = null;
                }
                if (typeof newValue.playListId != 'undefined' && newValue.playListId) {
                    player.loadPlaylist({ 'list': newValue.playListId });
                } else {
                    // randomize it
                    if (typeof newValue.relatedIds != 'undefined' && newValue.relatedIds) {
                        var item = newValue.relatedIds[Math.floor(Math.random() * newValue.relatedIds.length)];
                        currentVideoId = item;
                        player.loadVideoById(currentVideoId);
                        // adjust newValue to reflect currentVideoId
                        angular.forEach(args.message.videoList, function (value, key) {
                            if (value.videoId == currentVideoId) {
                                newValue = value;
                            }
                        });
                    } else if (scope.randomMode == 'on') {
                        var newIdx = Math.floor(Math.random() * args.message.videoList.length);
                        newValue = args.message.videoList[newIdx];
                        player.loadVideoById(newValue.videoId);
                    } else {
                        currentVideoId = newValue.videoId;
                        player.loadVideoById(newValue.videoId);
                    }                    
                }

                if (typeof newValue.duration != 'undefined' && newValue.duration) {
                    timer = $timeout(function () {
                        player.stopVideo();
                        scope.showPlayer = false;
                    }, convertToSec(newValue.duration) * 1000);
                } else {
                    if (typeof newValue.endTime != 'undefined' && newValue.endTime) {
                        var startTime = convertToSec(newValue.startTime);
                        var endTime = convertToSec(newValue.endTime);
                        var duration = endTime - startTime;
                        console.log('duration: ' + duration);
                        timer = $timeout(function () {
                            player.stopVideo();
                            scope.showPlayer = false;
                        }, duration * 1000);
                    }
                }
                player.seekTo(convertToSec(newValue.startTime));

                
            });

            scope.$watch('showPlayer', function (newValue, oldValue) {
                showHidePlayer(newValue);
            });

            scope.$watch('video', function (newValue, oldValue) {
                if (newValue !== oldValue) {

                }
            });

            function convertToSec(timeStr) {
                if (!timeStr) return 1;
                var parts = timeStr.split(":");
                var minutes = parseInt(parts[0]);
                var sec = parseInt(parts[1]);
                return 60 * minutes + sec;
            }


        }
    }

    function YouTubePlayerController($scope) {
        $scope.showPlayer = false;

    }

    YouTubePlayerController.$inject = ['$scope'];
})(angular);

