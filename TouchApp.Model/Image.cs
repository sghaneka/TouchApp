using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TouchApp.Model
{
    public class Image
    {
        public int ImageId { get; set; }

        [MaxLength(200)]
        public string ImageUrl { get; set; }

        [MaxLength(150)]
        public string Name { get; set; }
    }
}
