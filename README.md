# Yet Another Personal Assistent &nbsp;![YAPA Logo](https://github.com/NoSpread/YAPA/blob/master/yapa/images/icon-72x72.png)

Repository for Advanced Software Engineering

## Environment (backend)

.env file in YAPA/backend

```env
API_PORT=5000

FINNHUB_API_KEY=
WEATHER_API_KEY=
NEWS_API_KEY=
BING_API_KEY=
OPENTRIMAP_API_KEY=
COOKIE_SECRET=

REDIS_DB=1
REDIS_HOST=localhost
REDIS_PORT=6379

SQL_DB=yapa
SQL_HOST=localhost
SQL_PASS=
SQL_PORT=3306
SQL_USER=yapa
```

## Docker

```yaml
version: '3'
services: 
  mysql:
    hostname: 'mysql'
    image: "mariadb:latest"
    environment: 
        MYSQL_ROOT_PASSWORD: password
        MYSQL_DATABASE: yapa
    volumes: 
        - mysql_data:/var/lib/mysql
        - ./mysqldb.sql:/docker-entrypoint-initdb.d/mysqldb.sql

  redis:
    hostname: 'redis'
    image: "redis:latest"

  api:
    hostname: 'api'
    build: .
    ports:
      - "5000:5000"
    environment: 
      API_PORT: 5000
      CATCH_ALL_DOMAIN: 
      FINNHUB_API_KEY: 
      WEATHER_API_KEY: 
      NEWS_API_KEY: 
      BING_API_KEY: 
      OPENTRIMAP_API_KEY: 
      COOKIE_SECRET: 
      REDIS_DB: 0
      REDIS_HOST: redis
      REDIS_PORT: 6379
      SQL_DB: yapa
      SQL_HOST: mysql
      SQL_PASS: password
      SQL_PORT: 3306
      SQL_USER: root

volumes: 
  mysql_data:
```

## Frontend

```yaml
version: '3.3'
services: 
    frontend:
            hostname: frontend
            image: "nospread/yapa_frontend"
            build: .
            ports: 
                - "3000:3000"
            environment: 
                METEOR_SETTINGS: '{"public":{"endpoint":"https://api.nospread.xyz/yapa/v1"}}'
                IBM_TTS: ""
                IBM_STT: ""
                IBM_TTS_SERVICE: ""
                IBM_STT_SERVICE: ""
```

## Color Scheme

![#e63946](https://via.placeholder.com/15/e63946/000000?text=+) `#e63946` Imperial Red<br>
![#f1faee](https://via.placeholder.com/15/f1faee/000000?text=+) `#f1faee` Honeydew<br>
![#a8dadc](https://via.placeholder.com/15/a8dadc/000000?text=+) `#a8dadc` Powder Blue<br>
![#457b9d](https://via.placeholder.com/15/457b9d/000000?text=+) `#457b9d` Celadon Blue<br>
![#1d3557](https://via.placeholder.com/15/1d3557/000000?text=+) `#1d3557` Berliner Blue

## Key Words

 - aktivität -> activity.jsx
 - glückskeks -> fortune.jsx
 - witz -> joke.jsx
 - weg -> path.jsx
 - quiz -> quiz.jsx
 - aktien -> stocks.jsx
