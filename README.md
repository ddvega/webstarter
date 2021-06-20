# Full Stack Web Application Template
* Docker contained nextjs frontend
* Docker contained express backend
* Docker contained nginx for production deployment
* Docker contained mongodb for database

### access mongodb via terminal
1. `docker exec -it <name of container> bash`
2. `mongo`
3. `show dbs`

### access mongodb via compass
open compass and enter the following as the connection string

`mongodb://127.0.0.1:27017`

### env files needed
in the env_files directory, add 2 .env files, one for production, the other for development.
Files should look and be named as such:

`.env.production`
```
NEXT_PUBLIC_API_URL="<>"
AUTH0_SECRET='<>'
AUTH0_BASE_URL='<>'
AUTH0_ISSUER_BASE_URL='<>'
AUTH0_CLIENT_ID='<>'
AUTH0_CLIENT_SECRET='<>'
APP_NAME=appnamehere
```

`.env.development`
```
NEXT_PUBLIC_API_URL="<>"
AUTH0_SECRET='<>'
AUTH0_BASE_URL='<>'
AUTH0_ISSUER_BASE_URL='<>'
AUTH0_CLIENT_ID='<>'
AUTH0_CLIENT_SECRET='<>'
APP_NAME=appnamehere
```
