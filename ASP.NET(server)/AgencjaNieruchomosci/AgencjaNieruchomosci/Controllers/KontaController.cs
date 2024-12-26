using AgencjaNieruchomosci.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgencjaNieruchomosci.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KontaController : ControllerBase
    {
        private readonly ContextKonto _context;

        public KontaController(ContextKonto context)
        {
            _context = context;
        }

        // GET: api/Konta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Konto>>> GetKonta()
        {
            // Include Rola when retrieving Konta
            return await _context.Konta
                .Include(k => k.Rola)
                .ToListAsync();
        }

        // GET: api/Konta/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Konto>> GetKonto(int id)
        {
            // Include Rola when retrieving a specific Konto
            var konto = await _context.Konta
                .Include(k => k.Rola)
                .FirstOrDefaultAsync(k => k.ID == id);

            if (konto == null)
            {
                return NotFound();
            }

            return konto;
        }

        // PUT: api/Konta/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKonto(int id, Konto konto)
        {
            if (id != konto.ID)
            {
                return BadRequest();
            }

            // Ensure Rola is handled properly
            if (konto.Rola != null)
            {
                var existingRola = await _context.Set<Rola>()
                    .FirstOrDefaultAsync(r => r.Nazwa == konto.Rola.Nazwa);

                if (existingRola != null)
                {
                    konto.Rola = existingRola;
                }
            }

            _context.Entry(konto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KontoExists(id))
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

        // POST: api/Konta
        [HttpPost]
        public async Task<ActionResult<Konto>> PostKonto(Konto konto)
        {
            // Handle the Rola relationship
            if (konto.Rola != null)
            {
                var existingRola = await _context.Set<Rola>()
                    .FirstOrDefaultAsync(r => r.Nazwa == konto.Rola.Nazwa);

                if (existingRola != null)
                {
                    konto.Rola = existingRola;
                }
            }

            _context.Konta.Add(konto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKonto", new { id = konto.ID }, konto);
        }

        // DELETE: api/Konta/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKonto(int id)
        {
            var konto = await _context.Konta
                .Include(k => k.Rola) // Include Rola to handle cascading deletes if necessary
                .FirstOrDefaultAsync(k => k.ID == id);

            if (konto == null)
            {
                return NotFound();
            }

            _context.Konta.Remove(konto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KontoExists(int id)
        {
            return _context.Konta.Any(e => e.ID == id);
        }
    }
}
