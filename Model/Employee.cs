using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace EmployeeCRUDAPI.Model
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Gender { get; set; }
        public string Skills { get; set; }

        //public List<string> GetSkillsList()
        //{
        //    return JsonSerializer.Deserialize<List<string>>(Skills);
        //}

        //public void SetSkillsList(List<string> skills)
        //{
        //    Skills = JsonSerializer.Serialize(skills);
        //}
    }
}
