using System;
using System.ComponentModel.DataAnnotations;

namespace CS_Product_Web_App.Server.Models
{
    public class Product
    {
        [Key]
        public required int PartNumber { get; set; }
        public required string Name { get; set; }
        public required string Color { get; set; }
        public required int SizeInMillimeters { get; set; }

    }
}
