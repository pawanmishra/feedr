using FeedrInfrastructure.Model;
using FeedrInfrastructure.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace FeedApi.Controllers
{
    public class FeedController : ApiController
    {
        private readonly FeedService _feedService = new FeedService();

        // GET: api/Feed
        public IHttpActionResult Get()
        {
            return Ok(_feedService.GetFeeds());
        }

        // Get: api/Feed?feedName=geeksforgeeks
        [Route("api/Feed/{feedName}")]
        public IHttpActionResult Get(string feedName)
        {
            var feedItems = _feedService.GetFeedItems(feedName);
            return Ok(feedItems);
        }

        // GET: api/Feed?feed=geeksforgeeks&index=2
        [Route("api/Feed/{feedName}/{index}")]
        public IHttpActionResult Get(string feedName, int index)
        {
            var feedItems = _feedService.GetFeeds(feedName, index);
            return Ok(feedItems);
        }

        // POST: api/Feed
        public void Post(Feed feed)
        {
            _feedService.SaveFeed(feed);
        }

        // PUT: api/Feed/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Feed/5
        public void Delete(int id)
        {
        }
    }
}
