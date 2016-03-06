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

        // POST: api/Feed
        public IHttpActionResult Post(Feed feed)
        {
            _feedService.SaveFeed(feed);
            return Ok();
        }

        // PUT: api/Feed/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Feed/{feedName}
        [Route("api/Feed/{feedName}")]
        public IHttpActionResult Delete(string feedName)
        {
            try
            {
                _feedService.DeleteFeed(feedName);
                return Ok();
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
