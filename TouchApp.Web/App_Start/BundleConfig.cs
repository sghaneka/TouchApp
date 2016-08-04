using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Optimization;

namespace TouchApp.Web
{
    public class BundleConfig
    {

        public class PassthruBundleOrderer : IBundleOrderer
        {
            public IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
            {
                return files;
            }

            public virtual IEnumerable OrderFiles(BundleContext context, IEnumerable files)
            {
                return files;
            }
        }
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = true;

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            var appBundle = new ScriptBundle("~/bundles/app");
            appBundle.Orderer = new PassthruBundleOrderer();
            appBundle.Include("~/app/app.module.js",
                "~/app/common/onFinishRender.js",
                "~/app/common/imageOnLoad.js",
                "~/app/services/DataService.js",
                "~/app/layout/VideoScreenController.js",
                "~/app/tracks/TrackEditorController.js",
                "~/app/components/taYouTubePlayer.js",
                "~/Scripts/toastr.js"
                );

            bundles.Add(appBundle);

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

        }
    }
}
