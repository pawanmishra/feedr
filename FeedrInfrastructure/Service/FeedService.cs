using FeedrInfrastructure.Model;
using MongoDB.Driver;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Parser;

namespace FeedrInfrastructure.Service
{
    public class FeedService
    {
        private readonly FeedrContext _context = new FeedrContext();

        /// <summary>
        /// Get all the <see cref="FeedDocument"/> present in the database
        /// </summary>
        /// <returns></returns>
        public IEnumerable<FeedDocument> GetFeeds()
        {
            var feedDocuments = _context.Feeds.Find(_context => true).ToList();
            feedDocuments.ForEach(x => x.FeedItems = new List<FeedItem>());
            return feedDocuments;
        }

        /// <summary>
        /// Save the <paramref name="feed"/> in underlying database. Only add the feed if it is not present in the database.
        /// </summary>
        /// <param name="feed"></param>
        public async void SaveFeed(Feed feed)
        {
            var result = _context.Feeds.Find(x => x.Name.Equals(feed.name)).ToList().FirstOrDefault();
            if (result != null) return;

            FeedDocument feedDocument = new FeedDocument(feed.name, feed.feedUrl);
            await _context.Feeds.InsertOneAsync(feedDocument);
        }

        /// <summary>
        /// Returns list of <see cref="FeedItem"/> which are not present in the database
        /// </summary>
        /// <param name="feedName">Name of the <see cref="Feed"/></param>
        /// <param name="index">Pagination index</param>
        /// <returns>Collection of <see cref="FeedItem"/></returns>
        public IEnumerable<FeedItem> GetFeedItems(string feedName)
        {
            List<FeedItem> feedItems = new List<FeedItem>();
            var result = _context.Feeds.Find(x => x.Name.Equals(feedName)).ToList().FirstOrDefault();
            if(result != null)
            {
                var latestArticles = Parser.parseFeed(result.FeedUrl);
                foreach(var article in latestArticles)
                {
                    var feedItem = new FeedItem(article);
                    feedItems.Add(feedItem);

                    if (!result.FeedItems.Any(x => x.Uid.Equals(article.Uid)))
                    {   
                        result.FeedItems.Add(feedItem);
                    }
                }

                _context.Feeds.ReplaceOne<FeedDocument>(x => x.Name == result.Name, result);
            }

            return feedItems;
        }

        /// <summary>
        /// Saved input <see cref="FeedItem"/> in the <see cref="FeedDocument"/> with name <paramref name="feedName"/>
        /// </summary>
        /// <param name="feedName">Name of the feed</param>
        /// <param name="feedItem"><see cref="FeedItem"/> to be saved</param>
        public async void SaveFeedItem(string feedName, FeedItem feedItem)
        {
            var result = _context.Feeds.Find(x => x.Name.Equals(feedName)).ToList().FirstOrDefault();
            if(result != null)
            {
                result.FeedItems.Add(feedItem);
                await _context.Feeds.ReplaceOneAsync<FeedDocument>(x => x.Name == result.Name, result);
            }
        }
    }
}
