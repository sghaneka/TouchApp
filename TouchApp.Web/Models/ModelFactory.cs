using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TouchApp.Data;
using TouchApp.Model;

namespace TouchApp.Web.Models
{

    // finish the repoy things from this point on...
    public class ModelFactory
    {
        private ITouchRepository _repository;

        public ModelFactory(ITouchRepository repository)
        {
            _repository = repository;
        }

        public ImageModel Create(Image image)
        {
            return new ImageModel
            {
                ImageId = image.ImageId,
                Name = image.Name,
                ImageUrl = image.ImageUrl
            };
        }

        public PlayListModel Create(PlayList playList)
        {
            return new PlayListModel
            {
                PlayListId = playList.PlayListId,
                Name = playList.Name
            };
        }

        public TrackModel Create(Track track)
        {
            return new TrackModel()
            {
                TrackId = track.TrackId,
                PlayListId = track.GooglePlayListId,
                VideoId = track.GoogleVideoId,
                TrackImage = new ImageModel { ImageId = track.ArtistImage.ImageId,
                ImageUrl = track.ArtistImage.ImageUrl,
                Name = track.ArtistImage.Name},
                Name = track.Name,
                StartTime = track.StartTime,
                EndTime = track.EndTime,
                Duration = track.Duration,
                PlayLists = track.PlayLists.Select(x => x.PlayListId).ToList()
            };
        }

        public Track Parse(TrackModel trackModel)
        {
            Track track = new Track();
            track.GoogleVideoId = trackModel.VideoId;
            track.GooglePlayListId = trackModel.PlayListId;
            track.Name = trackModel.Name;
            track.StartTime = trackModel.StartTime;
            track.EndTime = trackModel.EndTime;
            track.Duration = trackModel.Duration;

            var q =
                   from pids in trackModel.PlayLists
                   join x in _repository.PlayLists
                   on pids equals x.PlayListId
                   select x;

            var q2 =
                  from imageids in _repository.Images
                  where imageids.ImageId == trackModel.TrackImage.ImageId
                  select imageids;

            track.PlayLists = q.ToList();
            track.ArtistImage = q2.FirstOrDefault();
            return track;
        }

        public PlayList Parse(PlayListModel playListModel)
        {
            PlayList playList = new PlayList();
            playList.Name = playListModel.Name;
            return playList;
        }

        public Image Parse(ImageModel imageModel)
        {
            Image img = new Image();
            img.ImageUrl = imageModel.ImageUrl;
            img.Name = imageModel.Name;
            return img;
        }
    }
}