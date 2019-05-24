# webpush example

```bash
curl --data '{"all":1,"payload":{"title":"Hello","message":"Hello, push"},"endpoint":["https://fcm.googleapis.com/fcm/send/dkITOcoi8pQ:APA91bFO67cT5U2_Tg3SU8Kkw-ZqVFZ8vG89_kUodCVxS6A8ajMO62REJ5sGZMaYpL3CmOcn7YP2LBPJlBuM6Rj57_DhEO23yToyFJdS17y23wkc54h7XiXmbCGbcEOYz_Z8wKu3anMb","https://updates.push.services.mozilla.com/wpush/v2/gAAAAABc56nKeRjp8khokojMZre7BvzHj8h3Vj6p2IIa7SW7_KxD3kYNE92GjtuGlbTI8Dcs8IqQt83EhmeqG8NpFkEgrxWxSoVJ8Bwdhl8dnJioaCvxaXB2JnUMT73CAj5wRaHd1xTLpsYKt5VW6RUYktUzALAJWtXPQU6AM8e9DMkNYO4SR14"],"ttl":3600}' -H 'Content-type:application/json' 'https://www.picoluna.com/api/v1/web_push/send/'
```

```bash
curl 'https://www.picoluna.com/api/v1/web_push/send/' -H 'Content-type:application/json' --data '{"endpoint": ["https://fcm.googleapis.com/fcm/send/fTY1ZLGrbg0:APA91bHUDjiKT6-bEcw2unOYLqDjp_dYcTaWjpd6Etjbm3M6-s_DZryBaUh3sw9rNvmrj4vaxAruBQvjkUn-eToiCANebdt-sIegzNdtTdWeNx02yurpSZreGhPT3EZwETCKZ4lh2g8T","https://fcm.googleapis.com/fcm/send/etanbenXuQM:APA91bFbm1evOPXlLhJyMFhRdJMrxA_k1E453mEtrmHlsOCaubQjFLkQxtTAslq9xsX_4CexpsSYFprn5PvvGxhlQMYSPu0wPa9izrlXwLtKe_GZbgHGkSU8H5n9qYebcMkn6m35cr4Z","https://updates.push.services.mozilla.com/wpush/v2/gAAAAABc58V1acdoTdJgXSNl-3bbVkpMRbnleIhqq0WAIa2ofhyqrWgilSHb6SG1fFBDGzWTGvQXJIev59xYS0dBFcuRf0mXriVoaowKqFRVYbJbs8OENGS_gbUeecRKduoWXZ1_QOpgiejVcH-QUH0YbvDHbDM16T4ir-pBLW_LdO7n-jKKrH0","https://fcm.googleapis.com/fcm/send/dXxkDqh-UKM:APA91bHYIAhwMsHymF3Ew5IswnfzHVEsKF8P6n42EjXgrltZYWv3qQlkcFThHuTblWjl_F9KDQajDWGu7SpJAMZybItd6zTaB2X5RfPUpnxvI5ZLQaMcVV5xsdVZD2-N4_rBWJ49Kk9R"], "payload": {"title":"Breaking news", "message":"Come on"}, "all": 1}'
```
