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
            // Handle the uploaded form data
            var ogloszenie = new Ogloszenie
            {
                Tytuł = tytul,
                Opis = opis,
                Ulica = ulica,
                Cena = cena,
                Zdjecia = new List<string>() // This assumes your Ogloszenie model has a property for image URLs
            };

            // Process the files
            foreach (var file in zdjecia)
            {
                // Define the path where the image will be saved within the wwwroot/Zdjecia folder
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Zdjecia", file.FileName);

                // Ensure the directory exists
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Zdjecia"));

                // Save the file to the specified path
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Optionally save the file path or URL to the database
                ogloszenie.Zdjecia.Add($"{file.FileName}"); // Save the relative path for access
            }

            // Add the ogloszenie to the database
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
    }
}
