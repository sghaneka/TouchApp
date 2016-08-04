using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouchApp.Model;

namespace TouchApp.Data
{
    public interface ITouchRepository
    {
        IQueryable<Track> Tracks { get; }

        IQueryable<PlayList> PlayLists { get; }

        IQueryable<Image> Images { get; }

        bool Insert(Track track);

        bool Insert(PlayList playList);

        bool Insert(Image image);

        bool SaveAll();
    }
}
