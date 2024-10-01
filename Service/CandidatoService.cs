using ProjetoLoguin.Util;
using ProjetoRhh.Model;


namespace ProjetoRhh.Service
{
    public class CandidatoService
    {
        public AppDatabase _context;

        public CandidatoService(AppDatabase context)
        {
            _context = context;
        }

        public List<Candidato> ListarCandidatos()
        {
            return _context.Candidatos.ToList();
        }

        public Candidato ObterCandidatoPorId(int id)
        {
            return _context.Candidatos.Find(id);
        }

        public void AdicionarCandidato(Candidato candidato)
        {
            _context.Candidatos.Add(candidato);
            _context.SaveChanges();
        }

        public void AtualizarCandidato(Candidato candidato)
        {
            _context.Candidatos.Update(candidato);
            _context.SaveChanges();
        }

        public void DeletarVaga(int id)
        {
            var Candidato = _context.Candidatos.Find(id);
            if (Candidato != null)
            {
                _context.Candidatos.Remove(Candidato);
                _context.SaveChanges();
            }
        }
    }
}
