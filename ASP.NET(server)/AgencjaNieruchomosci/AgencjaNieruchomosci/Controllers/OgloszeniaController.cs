using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgencjaNieruchomosci.Models;

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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // POST: api/Ogloszenia
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ogloszenie>> PostOgloszenie(Ogloszenie ogloszenie)
        {
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
