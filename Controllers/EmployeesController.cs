using EmployeeCRUDAPI.Data;
using EmployeeCRUDAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace EmployeeCRUDAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EMPDBContext _context;
        public EmployeesController(EMPDBContext context) 
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployeee()
        {
            var emp = await _context.Employees.ToListAsync();
            if(emp == null)
            {
                return NotFound("No records found!!");
            }
            return Ok(emp);
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            var emp = await _context.Employees.FindAsync(id);

            if (emp == null)
            {
                return NotFound();
            }

            return Ok(emp);
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> AddEmployee([FromBody] Employee emp)
        {
            if(emp == null)
            {
                return BadRequest("Invalid.");
            }
            else
            {                
                await _context.Employees.AddAsync(emp);
                await _context.SaveChangesAsync();
                return Ok(emp);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditEmployee(int id, [FromBody] Employee employee)
        {
            if (employee == null || id != employee.Id)
            {
                return BadRequest("Invalid employee data or ID mismatch.");
            }

            var existingEmployee = await _context.Employees.FindAsync(id);
            if (existingEmployee == null)
            {
                return NotFound("Employee not found.");
            }

            existingEmployee.Name = employee.Name;
            existingEmployee.Email = employee.Email;
            existingEmployee.Contact = employee.Contact;
            existingEmployee.Gender = employee.Gender;
            existingEmployee.Skills = employee.Skills;

            _context.Employees.Update(existingEmployee);
            await _context.SaveChangesAsync();

            return Ok(existingEmployee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound("Employee not found.");
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}