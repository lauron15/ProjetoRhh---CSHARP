using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoLoguin.Util;
using ProjetoRhh.Model;

namespace ProjetoRhh.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatoController : ControllerBase
    {
        private readonly AppDatabase _context;
        public CandidatoController(AppDatabase context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Candidato>>> CandidatoListarCandidatos()
        {
            var listarCandidatos = _context.Candidatos.ToList();
            return listarCandidatos;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<Candidato>> PostCandidato(Candidato candidato)
        {
            _context.Candidatos.Add(candidato);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCandidato", new { id = candidato.id }, candidato);
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutCandidato(Candidato candidato)
        {

            var candidatoAntigo = _context.Candidatos.Find(candidato.id);

            if (candidatoAntigo == null)
            {
                return NotFound();
            }


            _context.Entry(candidatoAntigo).CurrentValues.SetValues(candidato);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteCandidato(int id)
        {
            var candidato = await _context.Candidatos.FindAsync(id);
            if (candidato == null)
            {
                return NotFound();
            }

            _context.Candidatos.Remove(candidato);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CandidatoExists(int id)
        {
            return _context.Candidatos.Any(e => e.id == id);
        }
    }

}

