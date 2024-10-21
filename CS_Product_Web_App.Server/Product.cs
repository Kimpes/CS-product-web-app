namespace CS_Product_Web_App.Server
{
    public class Product
    {
        public required int PartNumber { get; set; }
        public required string Name { get; set; }
        public required string Color { get; set; }
        public required int SizeInMillimeters { get; set; }

    }
}
