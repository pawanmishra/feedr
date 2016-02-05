using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FeedrInfrastructure.Model
{
    public class Feed
    {
        /// <summary>
        /// Unique FeedId
        /// </summary>
        public string feedId { get; set; }

        /// <summary>
        /// Name of the site
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// Default feed url. Feed url should reflect the pagination index too.
        /// </summary>
        public string feedUrl { get; set; }

        /// <summary>
        /// Collection of <see cref="FeedItem"/>
        /// </summary>
        public List<FeedItem> feedItems { get; set; }
    }
}
