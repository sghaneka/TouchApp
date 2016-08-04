(function(angular) {
    angular
        .module('Touch')
        .controller('VideoScreenController', VideoScreenController);

    VideoScreenController.$inject = ['DataService', '$scope', '$uibModal', '$q'];

    function VideoScreenController(DataService, $scope, $uibModal, $q) {
        var vm = this;

        vm.randomMode = 'on';

        activate();

        function activate() {
            DataService.getImageList()
                .then(function (data) {
                    vm.imageList = data;
                })
                .catch(function (err) {
                    toastr.error('error in dataservice, getting imageList ' + err);
                })

            DataService.getPlayList()
                .then(function (data) {
                    vm.playList = data;
                    vm.selectedPlayList = vm.playList[0].playListId;
                })
                .catch(function (err) {
                    toastr.error('error in dataservice, getting playlist... ' + err);
                });
        }

        $scope.$watch('vm.selectedPlayList', function (newValue, oldValue) {
            if (newValue) {
                vm.loading = true;
                DataService.getTracksForPlayList(newValue)
                .then(function (data) {
                    vm.loading = false;
                    vm.imagesLoaded = 0;
                    vm.videos = data;
                })
                .catch(function (err) {
                    vm.loading = false;
                    toastr.error('error in dataservice, getting tracks for playlist... ' + err);
                })
            }
        })

        //DataService.getPlayList()
        //           .then(function (data) {
        //               vm.playList = data;
        //               vm.selectedPlayList = vm.playList[0].playListId;
        //               DataService.getTracksForPlayList(vm.playList[0].playListId)
        //               .then(function(data){
        //                   vm.videos = data;
        //                   DataService.getImageList()
        //                   .then(function (data) {
        //                       vm.imageList = data;
        //                   })
        //               })
        //               .catch(function (err) {
        //                   toastr.error('error in dataservice, getting tracks for playlist... ' + err);
        //               })
        //           })
        //           .catch(function (err) {
        //               toastr.error('error in dataservice, getting playlist... ' + err);
        //           });

        vm.click = function (video) {
            var tmp = { message: { currentVideo: video, videoList: vm.videos } };
            $scope.$broadcast('clickHit', tmp);
            vm.selectedVideo = video;
        }

        
        vm.addTracks = function () {
            $uibModal.open({
                animation: false,
                templateUrl: '/app/tracks/track-editor.html',
                controller: 'TrackEditorController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    initService: function () {
                        return {
                            playList: vm.playList,
                            imageList: vm.imageList
                        };
                    }
                }
            });

        }

        $scope.$watch('vm.imagesLoaded', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if (newValue == vm.videos.length) {
                    $(".galleryItem").find(".jajuThumbnail").uniformHeight();

                }
            }
        })

        vm.imageLoaded = function () {
            vm.imagesLoaded++;
        }
    }
})(angular);

