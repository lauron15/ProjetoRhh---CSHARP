using ProjetoLoguin.Util;
using ProjetoRhh.Model;
using System.Collections.Generic;

namespace ProjetoRhh.Service
{
    public class VagaService
    {
        public AppDatabase _context;

        public VagaService(AppDatabase context)
        {
            _context = context;
        }

        public List<Vaga> ListarVagas()
        {
            return _context.Vagas.ToList();
        }

        public Vaga ObterVagaPorId(int id)
        {
            return _context.Vagas.Find(id);
        }

        public void AdicionarVaga(Vaga vaga)
        {
            _context.Vagas.Add(vaga);
            _context.SaveChanges();
        }

        public void AtualizarVaga(Vaga vaga)
        {
            _context.Vagas.Update(vaga);
            _context.SaveChanges();
        }

        public void DeletarVaga(int id)
        {
            var vaga = _context.Vagas.Find(id);
            if (vaga != null)
            {
                _context.Vagas.Remove(vaga);
                _context.SaveChanges();
            }
        }
    }
}
