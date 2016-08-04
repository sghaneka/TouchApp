(function(angular) {
    angular
        .module('Touch')
        .controller('TrackEditorController', TrackEditorController);

    TrackEditorController.$inject = ['DataService', '$uibModalInstance', 'initService'];

    function TrackEditorController(DataService, $uibModalInstance, initService) {
        var vm = this;
        vm.playList = initService.playList;
        vm.imageList = initService.imageList;
        vm.testVar = 322;
        vm.selectedPlayList = initService.playList[0];
        vm.selectedImage = initService.imageList[0];

        vm.save = function () {
            // $uibModalInstance.close(vm.testVar);
            DataService.addTrack({
                name: vm.trackName,
                videoId: vm.videoId,
                playListId: vm.playListId, // google play list id
                trackImage: {
                    imageId: vm.selectedImage.imageId
                },
                startTime: vm.startTime,
                duration: vm.duration,
                endTime: vm.endTime,
                playLists: [vm.selectedPlayList.playListId]
            }).then(function (data) {
                console.log('all clearing should happen now...');
                toastr.info('Track Saved...');
            })
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.addImage = function () {
            if (vm.imageUrl && vm.imageName) {
                DataService.addImage({ name: vm.imageName, url: vm.imageUrl })
                .then(function (data) {
                    vm.imageList.push(data);
                    vm.selectedImage = data;
                    vm.imageName = '';
                    vm.imageUrl = '';
                })
            }
        }

        vm.addPlayList = function () {
            if (vm.playListName)
            {
                DataService.addPlayList(vm.playListName)
                .then(function (data) {
                    vm.playList.push(data);
                    vm.selectedPlayList = data;
                    vm.playListName = '';
                })
            }
        }
    }

})(angular);