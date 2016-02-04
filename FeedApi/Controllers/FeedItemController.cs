using FeedrInfrastructure.Model;
using FeedrInfrastructure.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FeedApi.Controllers
{
    public class FeedItemController : ApiController
    {
        private readonly FeedService _feedService = new FeedService();

        // GET: api/FeedItem
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/FeedItem/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/FeedItem
        public void Post(FeedItem feedItem)
        {
        }

        // PUT: api/FeedItem/geeksforgeeks
        public void Put(string id, [FromBody]FeedItem feedItem)
        {
            _feedService.SaveFeedItem(id, feedItem);
        }

        // DELETE: api/FeedItem/5
        public void Delete(int id)
        {
        }
    }
}
