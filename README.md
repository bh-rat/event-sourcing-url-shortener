
# Event Sourcing Based URL Shortener

This is a minimalistic URL shortener; Something that would be used internally within a lot of applications.
The viewCount of each url increases on each fetch; Also there's a way to increase the viewCount in batch which might be passed from a high level service.  

Frameworks & libraries used : 
- NestJS Framework
- @nestjs/cqrs
- event-sourcing-js : mainly using this for providing the base for an event store
- mongoose


## Install & run locally

Update `src/configs.ts` with MONGO_URL value shared in the email. Then run : 

```
$ npm install
$ npm run start
```


## API Reference

#### Get all links in the system

```http
  GET /link
```

Sample curl : 
```
curl --location 'localhost:3000/link'
```

#### Get link : Increases viewCount of the link

```http
  GET /link/${shortcode}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `shortcode`      | `string` | **Required**. Shortcode of link to fetch; |

Sample curl : 
```
curl --location --request GET 'localhost:3000/link/fd436889' \
--header 'Content-Type: application/json' \
--data '{  
}'
```

#### Create Link (POST with JSON body)

```http
  POST /link
```
Creates the link; 8 character shortcode/id is auto generated for the url

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `destination`      | `string` | **[in body]**. url of the link |
| `title`      | `string` | **[in body]**. title |

Sample curl
```
curl --location 'localhost:3000/link' \
--header 'Content-Type: application/json' \
--data '{
    "destination": "https://www.superadvisor.ai/",
    "title": "Super Advisor AI"
}'
```

#### Increment View Count for the link

```http
  POST /link/${shortcode}/count/${count}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `shortcode`      | `string` | **Required**. Shortcode/id of link |
| `count`      | integer | **Required**. Count to increment |

Sample curl : 
```
curl --location --request POST 'localhost:3000/link/fd436889/count/1000'
```


## Workarounds used/Possible Optimizations

The idea is that I have 
Things that can be done in a better way or are missed out in lieu of time : 
- Better validations; Have kept it to a minimum
- Better Read Models Projections have been built in a hacky way
- Auth + Multi model (User)
- abstract LinkRepo with multiple implemntations so as to be able to swap out between DBs + Use an ORM
- Snapshots have been skipped. 
- Pagination in GET `/links`
- View count increment API structure
