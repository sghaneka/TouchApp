using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouchApp.Model;

namespace TouchApp.Data
{
    public interface ITouchContext
    {
        IDbSet<Track> Tracks { get; set; }

        IDbSet<PlayList> PlayLists { get; set; }

        IDbSet<Image> Images { get; set; }

        int SaveChanges();               
    }
}
