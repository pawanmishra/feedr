using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using FeedrInfrastructure.Model;
using System.Configuration;

namespace FeedrInfrastructure
{
    /// <summary>
    /// Context class for creating <see cref="MongoClient"/> instance and accessing <see cref="IMongoDatabase"/> instance
    /// </summary>
    public class FeedrContext
    {
        private IMongoDatabase _database;

        /// <summary>
        /// Default constructor
        /// </summary>
        public FeedrContext()
        {
            var client = new MongoClient(ConfigurationManager.ConnectionStrings["FeedrConnectionString"].ConnectionString);
            _database = client.GetDatabase(ConfigurationManager.AppSettings["FeedrDatabaseName"]);
        }

        /// <summary>
        /// <see cref="IMongoDatabase"/> instance initialized via <see cref="MongoClient"/>
        /// </summary>
        public IMongoDatabase Database
        {
            get { return _database; }
        }

        /// <summary>
        /// Property for accessing underlying feed collection in database
        /// </summary>
        public IMongoCollection<FeedDocument> Feeds
        {
            get { return _database.GetCollection<FeedDocument>(ConfigurationManager.AppSettings["FeedrCollectionName"]); }
        }
    }
}
