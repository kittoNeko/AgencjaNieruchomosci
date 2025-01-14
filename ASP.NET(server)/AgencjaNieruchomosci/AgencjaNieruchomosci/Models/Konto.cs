namespace AgencjaNieruchomosci.Models
{
    public class Konto
    {
        public int ID { get; set; }
        public string Login { get; set; }
        public string Haslo { get; set; }
        public string Email { get; set; }
        public Rola Rola { get; set; }
    }
}
