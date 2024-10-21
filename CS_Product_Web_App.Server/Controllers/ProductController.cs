using Microsoft.AspNetCore.Mvc;
using CS_Product_Web_App.Server.Models;
using CS_Product_Web_App.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace CS_Product_Web_App.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

    }
}
