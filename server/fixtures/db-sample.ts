import { ArticlesTraffic } from "../types";

const dbSample: ArticlesTraffic = {
  traffic_data: [
    {
      id: "f1cbfdfd-006f-4d77-9fbb-913758170a49",
      url: "https://www.example.com/article1",
      author: "John",
      image_url: "https://picsum.photos/600/400?buster=0.19513832527942854",
      geo: "ES",
      daily_traffic: [
        {
          day: 1,
          hourly_traffic: [
            {
              hour: 0,
              traffic: 10
            },
            {
              hour: 1,
              traffic: 15
            }
          ]
        },
        {
          day: 2,
          hourly_traffic: [
            {
              hour: 0,
              traffic: 20
            },
            {
              hour: 1,
              traffic: 25
            }
          ]
        }
      ]
    },
    {
      id: "7cb0f337-4428-4287-bcc5-0a11dacdbe9c",
      url: "https://www.example.com/article2",
      author: "John",
      image_url: "https://picsum.photos/600/400?buster=0.44845201669485557",
      geo: "US",
      daily_traffic: [
        {
          day: 1,
          hourly_traffic: [
            {
              hour: 0,
              traffic: 30
            },
            {
              hour: 1,
              traffic: 35
            }
          ]
        },
        {
          day: 2,
          hourly_traffic: [
            {
              hour: 0,
              traffic: 40
            },
            {
              hour: 1,
              traffic: 45
            }
          ]
        }
      ]
    }
  ]
}

export default dbSample;