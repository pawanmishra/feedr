module Parser

open System.Net
open System.Web
open FSharp.Data
open Newtonsoft.Json

type BaseFeed = XmlProvider<"http://www.geeksforgeeks.org/feed/">

let RedditFeed = "https://www.reddit.com/r/programming/.rss"

type Article = { Title:string; Link:string; Description:string; Uid:string}

let getAsync (url:string) = 
    async {
        let httpClient = new System.Net.Http.HttpClient()
        let! response = httpClient.GetAsync(url) |> Async.AwaitTask
        response.EnsureSuccessStatusCode () |> ignore
        let! content = response.Content.ReadAsStringAsync() |> Async.AwaitTask
        return content
    }

let parseFeed (url:string) = 
        let data = BaseFeed.Load url
        let items = data.Channel.Items
        let record = items |> Array.map (fun x -> {Title = x.Title; Link = x.Link; Description = x.Description; Uid = x.Guid.Value})
        record

