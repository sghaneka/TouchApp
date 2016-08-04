namespace TouchApp.Data.Migrations
{
    using Model;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<TouchApp.Data.TouchContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "TouchApp.Data.TouchContext";
            AutomaticMigrationDataLossAllowed = true;
        }
    }
}
