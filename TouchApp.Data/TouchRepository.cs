using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouchApp.Model;

namespace TouchApp.Data
{
    public class TouchRepository : ITouchRepository
    {
        private ITouchContext _context;

        public TouchRepository(ITouchContext context)
        {
            _context = context;
        }

        public IQueryable<Track> Tracks
        {
            get { return _context.Tracks; }
        }

        public IQueryable<PlayList> PlayLists
        {
            get { return _context.PlayLists; }
        }

        public IQueryable<Image> Images
        {
            get { return _context.Images; }
        }

        public bool Insert(Track track)
        {
            try
            {
                _context.Tracks.Add(track);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Insert(PlayList playList)
        {
            try
            {
                _context.PlayLists.Add(playList);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Insert(Image image)
        {
            try
            {
                _context.Images.Add(image);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
