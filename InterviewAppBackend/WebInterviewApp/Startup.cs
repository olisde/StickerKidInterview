using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;

namespace WebInterviewApp
{
    public class Startup
    {
        readonly string MyAllowAllOrigins = "_myAllowAllOrigins";
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {   /*
            --This is config for Authorization which I did not activate for this project to avoid excess of form but wanted to show how I would implement it
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
            {
                opt.Audience = Configuration["AAD:ResourceId"];
                opt.Authority = $"{Configuration["AAD:InstanceId"]}{Configuration["AAD:TenantId"]}";
            });
            */
            services.AddControllers().AddJsonOptions(o =>
            {
                o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                // If I decided to use guid o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
            
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowAllOrigins,
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .Build();;
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors();
            //app.UseAuthentication();
            //app.UseAuthorization();

     

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/echo",
                        context => context.Response.WriteAsync("echo"))
                    .RequireCors(MyAllowAllOrigins);

                endpoints.MapControllers()
                    .RequireCors(MyAllowAllOrigins);
            });
        }
    }
}
