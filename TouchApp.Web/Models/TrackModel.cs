using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TouchApp.Web.Models
{
    public class TrackModel
    {
        public int TrackId { get; set; }
        public string VideoId { get; set; }

        public ImageModel TrackImage { get; set; }

        public string PlayListId { get; set; }

        public string Name { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }

        public string Duration { get; set; }

        public List<int> PlayLists { get; set; }
    }
}