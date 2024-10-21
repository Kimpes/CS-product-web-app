using Microsoft.AspNetCore.Mvc;

namespace CS_Product_Web_App.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        [HttpGet(Name = "GetProduct")]
        public ActionResult<Product> GetProduct(int partNumber)
        {
            return new Product
            {
                Color = "Red",
                Name = "Product 1",
                PartNumber = 1,
                SizeInMillimeters = 200
            };
            // Implement logic to fetch product data from a database later
        }

    }
}
