using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TouchApp.Data;
using TouchApp.Model;
using TouchApp.Web.Models;

namespace TouchApp.Web.api
{
    public class PlayListController : BaseApiController
    {
        public PlayListController(ITouchRepository repo) : base(repo)
        {

        }

        public IEnumerable<PlayListModel> Get()
        {
            var results = TheRepo.PlayLists.ToList();
            return results.Select(x => TheModelFactory.Create(x));
        }

        [Route("api/Images/Imagelist")]
        [HttpGet]
        public IEnumerable<ImageModel> GetImages()
        {
            var results = TheRepo.Images.ToList();
            return results.Select(x => TheModelFactory.Create(x));
        }

        [Route("api/Image/Add")]
        [HttpPost]
        public HttpResponseMessage ImageAdd([FromBody] ImageModel imageModel)
        {
            Image i = TheModelFactory.Parse(imageModel);
            try
            {
                TheRepo.Insert(i);
                if (TheRepo.SaveAll())
                {
                    return Request.CreateResponse(HttpStatusCode.Created, TheModelFactory.Create(i));
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

        public HttpResponseMessage Post([FromBody]PlayListModel playListModel)
        {
            PlayList p = TheModelFactory.Parse(playListModel);
            try
            {
                TheRepo.Insert(p);
                if (TheRepo.SaveAll())
                {
                    return Request.CreateResponse(HttpStatusCode.Created, TheModelFactory.Create(p));
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not save to the db");
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }


    }
}
