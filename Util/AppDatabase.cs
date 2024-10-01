using Microsoft.EntityFrameworkCore;
using ProjetoRhh.Model;


namespace ProjetoLoguin.Util
{
    public class AppDatabase : DbContext
    {
        public AppDatabase(DbContextOptions<AppDatabase> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }


        public DbSet<Vaga> Vagas { get; set; }
        public DbSet<Candidato> Candidatos { get; set; }
        //public DbSet<Produtos> Produtos { get; set; }




    }
}