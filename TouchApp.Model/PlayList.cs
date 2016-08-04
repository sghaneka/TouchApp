using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TouchApp.Model
{
    public class PlayList
    {
        public PlayList()
        {
            Tracks = new HashSet<Track>();
        }
        public int PlayListId { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        public virtual ICollection<Track> Tracks { get; set; }
    }
}
