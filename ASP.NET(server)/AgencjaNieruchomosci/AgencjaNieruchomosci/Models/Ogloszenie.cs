namespace AgencjaNieruchomosci.Models
{
    public class Ogloszenie
    {
        public int ID { get; set; }
        public string Tytuł { get; set; }
        public string Opis { get; set; }
        public string Ulica { get; set; }
        public float Cena { get; set; }
        public List<string> Zdjecia { get; set; } = new List<string>();
    }
}
