using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouchApp.Model;

namespace TouchApp.Data
{
    public class TouchContext : DbContext, ITouchContext
    {
        public TouchContext()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<TouchContext, TouchApp.Data.Migrations.Configuration>());
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
        }
        public IDbSet<Track> Tracks { get; set; }

        public IDbSet<PlayList> PlayLists { get; set; }

        public IDbSet<Image> Images { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
        }

    }
}
