using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Net;
using System.Net.Http;
using TouchApp.Data;
using TouchApp.Model;
using TouchApp.Web.Models;
using System.Web.Http;

namespace TouchApp.Web.api
{
    public class TracksController : BaseApiController
    {
        public TracksController(ITouchRepository repo) : base(repo)
        {

        }

        public HttpResponseMessage Post(TrackModel trackModel)
        {
            Track entity = TheModelFactory.Parse(trackModel);
            try
            {
                TheRepo.Insert(entity);
                if (TheRepo.SaveAll())
                {
                    return Request.CreateResponse(HttpStatusCode.Created, TheModelFactory.Create(entity));
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not save to the db");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        public IEnumerable<TrackModel> Get()
        {
            var results = TheRepo.Tracks.Include(b => b.PlayLists).Include(b => b.ArtistImage).ToList();
            return results.Select(x => TheModelFactory.Create(x)).ToList();
        }

        public TrackModel Get(int id)
        {
            var track = TheRepo.Tracks
                .Include(b => b.PlayLists)
                .Include(b => b.ArtistImage)
                .Where(x => x.TrackId == id).FirstOrDefault();
            return TheModelFactory.Create(track);
        }

        [Route("api/Tracks/Playlist/{playListId}")]
        [HttpGet]
        public IEnumerable<TrackModel> GetTracksForPlaylist(int playListId)
        {
            var playList = TheRepo.PlayLists.Where(x => x.PlayListId == playListId).FirstOrDefault();
            var results = TheRepo.Tracks.Include(b => b.PlayLists).Include(b => b.ArtistImage).Where(yx => yx.PlayLists.Any(yx1 => yx1.PlayListId == playListId)).ToList();
            return results.Select(yyx => TheModelFactory.Create(yyx)).ToList(); 
        }


    }
}
