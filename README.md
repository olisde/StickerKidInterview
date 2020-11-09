Hello there

This application consists of:

- .Net Core 3.1 Backend in InterviewAppBackend folder
- React.js Frontend in InterviewAppFrontend
- Postgres 13 SQL database (import to Postgres from InterviewAppDB.sql)


Backend:

To run the backend you will need to build the solution after opening the project folder. It will listen on ports 6000 and 6001 by default.

Apart from default packages, the dependencies are:

Dapper.SimpleCRUD/2.2.0.1
Dapper/2.0.35
Microsoft.AspNetCore.Authentication.JWTBearer/3.1.9
Microsoft.VisualStudio.Web.CodeGeneration.Design/3.1.1
Npgsql/4.1.5
System.Configuration.ConfigurationManager/4.7.0
System.Text.Json/4.7.2
System.Data.SqlClient/4.8.2


Frontend:
Both the project and the build are in the InterviewAppFrontend folder.

All the frontend dependencies are listed in InterviewAppFrontend/package.json

Remember to run "npm install" for the missing packages that were deleted to save space.

You can run the build by installing "npm install -g serve" and then running eg.

"serve -s build -l 3000"  where 3000 can be swapped for a desired port (do not use 6000 and 6001 as these are backend ports)


Database:

InterviewAppDB.sql can be imported to Postresql through pgAdmin (or however you prefer)
Backend is expecting following connection parameters Host=localhost ;Port=5432;uid=postgres ; password = admin; Database=TableFootball. If you change those please make sure to change the connection string in backend's App.config file.

The database has no records thus after running the app you should start off by creating players.


Please reach out to me in case of any problems or questions.
