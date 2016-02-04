using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FeedrInfrastructure.Model
{
    /// <summary>
    /// Document model representing a feed
    /// </summary>
    public class FeedDocument
    { 
        public FeedDocument(string name, string url)
        {
            Name = name;
            FeedUrl = url;
            FeedItems = new List<FeedItem>();
        }

        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        [BsonId]
        public string FeedId { get; set; }

        /// <summary>
        /// Name of the site
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Default feed url. Feed url should reflect the pagination index too.
        /// </summary>
        public string FeedUrl { get; set; }

        /// <summary>
        /// Collection of <see cref="FeedItem"/>
        /// </summary>
        public List<FeedItem> FeedItems { get; set; }
    }
}
