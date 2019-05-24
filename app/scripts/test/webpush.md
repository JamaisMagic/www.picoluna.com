# webpush example

```bash
curl --data '{"all":1,"payload":{"title":"Hello","message":"Hello, push"},"endpoint":["https://fcm.googleapis.com/fcm/send/dkITOcoi8pQ:APA91bFO67cT5U2_Tg3SU8Kkw-ZqVFZ8vG89_kUodCVxS6A8ajMO62REJ5sGZMaYpL3CmOcn7YP2LBPJlBuM6Rj57_DhEO23yToyFJdS17y23wkc54h7XiXmbCGbcEOYz_Z8wKu3anMb","https://updates.push.services.mozilla.com/wpush/v2/gAAAAABc56nKeRjp8khokojMZre7BvzHj8h3Vj6p2IIa7SW7_KxD3kYNE92GjtuGlbTI8Dcs8IqQt83EhmeqG8NpFkEgrxWxSoVJ8Bwdhl8dnJioaCvxaXB2JnUMT73CAj5wRaHd1xTLpsYKt5VW6RUYktUzALAJWtXPQU6AM8e9DMkNYO4SR14"],"ttl":3600}' -H 'Content-type:application/json' 'https://www.picoluna.com/api/v1/web_push/send/'
```
