using AgencjaNieruchomosci.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgencjaNieruchomosci.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OgloszeniaController : ControllerBase
    {
        private readonly ContextOgloszenia _context;

        public OgloszeniaController(ContextOgloszenia context)
        {
            _context = context;
        }

        // GET: api/Ogloszenia
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ogloszenie>>> GetOgloszenia()
        {
            return await _context.Ogloszenia.ToListAsync();
        }

        // GET: api/Ogloszenia/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ogloszenie>> GetOgloszenie(int id)
        {
            var ogloszenie = await _context.Ogloszenia.FindAsync(id);

            if (ogloszenie == null)
            {
                return NotFound();
            }

            return ogloszenie;
        }

        // PUT: api/Ogloszenia/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOgloszenie(int id, Ogloszenie ogloszenie)
        {
            if (id != ogloszenie.ID)
            {
                return BadRequest();
            }

            _context.Entry(ogloszenie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OgloszenieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<Ogloszenie>> PostOgloszenie(
    [FromForm] string tytul,
    [FromForm] string opis,
    [FromForm] string ulica,
    [FromForm] float cena,
    [FromForm] List<IFormFile> zdjecia)
        {
            var ogloszenie = new Ogloszenie
            {
                Tytuł = tytul,
                Opis = opis,
                Ulica = ulica,
                Cena = cena,
                Zdjecia = new List<string>()
            };
            var imagesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Zdjecia");
            Directory.CreateDirectory(imagesDirectory);
            foreach (var file in zdjecia)
            {
                var extension = Path.GetExtension(file.FileName);
                var randomFileName = Path.Combine(imagesDirectory, $"{GenerateRandomString(64)}{extension}");
                using (var stream = new FileStream(randomFileName, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                ogloszenie.Zdjecia.Add($"{Path.GetFileName(randomFileName)}");
            }
            _context.Ogloszenia.Add(ogloszenie);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetOgloszenie", new { id = ogloszenie.ID }, ogloszenie);
        }
        // DELETE: api/Ogloszenia/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOgloszenie(int id)
        {
            var ogloszenie = await _context.Ogloszenia.FindAsync(id);
            if (ogloszenie == null)
            {
                return NotFound();
            }

            _context.Ogloszenia.Remove(ogloszenie);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OgloszenieExists(int id)
        {
            return _context.Ogloszenia.Any(e => e.ID == id);
        }
        private string GenerateRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
