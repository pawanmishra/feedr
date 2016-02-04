using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Parser;

namespace FeedrInfrastructure.Model
{
    /// <summary>
    /// Class for representing individual Feed item
    /// </summary>
    public class FeedItem
    {
        public FeedItem(Article feed)
        {
            Link = feed.Link;
            Description = feed.Description;
            Title = feed.Title;
            Uid = feed.Uid;
            Status = ItemStatus.New;
        }

        /// <summary>
        /// Default Constructor
        /// </summary>
        public FeedItem()
        {

        }

        /// <summary>
        /// Article link
        /// </summary>
        public string Link { get; set; }

        /// <summary>
        /// Article title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Article description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Unique id of the article
        /// </summary>
        public string Uid { get; set; }

        /// <summary>
        /// Status of the <see cref="FeedItem"/>
        /// </summary>
        public ItemStatus Status { get; set; }
    }
}
