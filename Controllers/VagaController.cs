using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoLoguin.Util;
using ProjetoRhh.Model;

namespace ProjetoRhh.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VagaController : ControllerBase
    {

        private readonly AppDatabase _context; 
        public VagaController (AppDatabase context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Vaga>>> VagaListarVagas() 
        {
            var listarVagas = _context.Vagas.ToList();
            return listarVagas;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<Vaga>> PostVaga(Vaga vagas)
        {
            _context.Vagas.Add(vagas);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetVaga", new { id = vagas.id}, vagas);
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutVaga(Vaga vagas)
        {

            var funcionarioAntigo = _context.Vagas.Find(vagas.id);

            if (funcionarioAntigo == null)
            {
                return NotFound();
            }


            _context.Entry(funcionarioAntigo).CurrentValues.SetValues(vagas);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var vagas = await _context.Vagas.FindAsync(id);
            if (vagas == null)
            {
                return NotFound();
            }

            _context.Vagas.Remove(vagas);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VagasExistente(int id)
        {
            return _context.Vagas.Any(e => e.id == id);
        }
    }


}


    

