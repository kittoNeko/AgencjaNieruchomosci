namespace AgencjaNieruchomosci.Models
{
    public class Rola
    {
        public int ID { get; set; }
        public string Nazwa { get; set; }
        public List<string> Pozwolenia { get; set; }
    }
}
