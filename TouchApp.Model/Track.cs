using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TouchApp.Model
{
    public class Track
    {
        public Track()
        {
            PlayLists = new HashSet<PlayList>();
        }

        public int TrackId { get; set; }

        [MaxLength(50)]
        public string GoogleVideoId { get; set; }

        [MaxLength(50)]
        public string GooglePlayListId { get; set; }

        public Image ArtistImage { get; set; }

        [MaxLength(150)]
        public string Name { get; set; }
        [MaxLength(10)]
        public string StartTime { get; set; }
        [MaxLength(10)]
        public string EndTime { get; set; }
        [MaxLength(10)]
        public string Duration { get; set; }

        public ICollection<PlayList> PlayLists { get; set; }

        //public ICollection<Track> AssociatedTracks { get; set; }
    }
}
