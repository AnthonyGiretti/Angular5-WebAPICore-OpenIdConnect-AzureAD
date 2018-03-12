using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApiJwtBearer.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        [Authorize]
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var data = new { text = "got data from server" };
            return this.Ok(data);
        }   
    }
}