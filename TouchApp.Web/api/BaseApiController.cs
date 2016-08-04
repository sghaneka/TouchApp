using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using TouchApp.Data;
using TouchApp.Web.Models;

namespace TouchApp.Web.api
{
    public abstract class BaseApiController : ApiController
    {
        private ITouchRepository _repo;
        private ModelFactory _modelFactory;

        public BaseApiController(ITouchRepository repo)
        {
            _repo = repo;
            _modelFactory = new ModelFactory(repo);
        }

        protected ITouchRepository TheRepo { get { return _repo; } }

        protected ModelFactory TheModelFactory {  get { return _modelFactory; } }
    }
}