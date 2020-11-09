using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using System.Data;
using Dapper;

namespace WebInterviewApp.Utilities
{

    public class DbService
    {
        public DbService()
        {
        //dialect setting
        Dapper.SimpleCRUD.SetDialect(Dapper.SimpleCRUD.Dialect.PostgreSQL);
        }

        
        public  IDbConnection con =  new NpgsqlConnection(Helper.ConStrVal("TableFootball"));

        //Dapper.SimpleCRUD.TableNameResolver would be used for me to create a resolver class to adhere to Postgres lowercase
    }
}
