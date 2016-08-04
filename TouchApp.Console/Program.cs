using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouchApp.Data;
using TouchApp.Model;

namespace TouchApp.Console
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var context = new TouchContext())
            {
                var results = context.PlayLists.ToList();
                foreach(var x in results)
                {
                    System.Console.WriteLine(x.Name);
                }

                var tracks = context.Tracks.Include(x => x.PlayLists).ToList();
                foreach (var x in tracks)
                {
                    System.Console.WriteLine(x.PlayLists.Count);
                }
            }
            System.Console.ReadLine();
        }
        
    }
}
