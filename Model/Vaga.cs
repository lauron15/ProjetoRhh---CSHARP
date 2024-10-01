using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoRhh.Model
{


    [Table("vaga")]
    public class Vaga
    {
        [Key]
        [Column("vagaid")]
        public int id { get; set; }

        [Column("nome")]
        public String? nome {  get; set; }

        [Column("descricao")]
        public String? descricao {  get; set; }


    }
}
