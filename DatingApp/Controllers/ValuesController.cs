using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DatingApp.Model;
using Microsoft.AspNetCore.Authorization;

namespace DatingApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public ValuesController(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }
        [AllowAnonymous]
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        { 
            var values = await _dataContext.Values.ToListAsync();
            return Ok(values);
        }

        // GET api/values/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var value = await _dataContext.Values.FirstOrDefaultAsync(a => a.Id == id);
            return Ok(value);
        }

        // POST api/values
        [HttpPost("")]
        public void Post([FromBody] string value)
        {
            ////var createValue = new Values() { Name = value };
            ////await _dataContext.Values.AddAsync(createValue);
            ////await _dataContext.SaveChangesAsync();
            ////return Ok(createValue);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
