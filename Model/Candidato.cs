using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoRhh.Model
{
   
    [Table("candidato")]
    public class Candidato
    {
        [Key]
        [Column("id")]
        public int id { get; set; }

        [Column("rg")]
        public String? rg { get; set; }

        [Required(ErrorMessage = "O nome do candidato é obrigatório")]
        public string nomecandidato { get; set; }
    }
}
