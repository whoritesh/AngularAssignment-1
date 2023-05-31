import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Employee } from 'src/app/Models/employee.model';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
  form!: FormGroup;
  isIdDisabled: boolean = true;
  employees: Employee[] = [];
  employeeId: string | null = null;
  editEmployeData!:Employee;
  pageTitle: string = 'Add Employee';
  iseditable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private employeeservice : EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.pageTitle = 'Edit Employee';
    }


    this.form = this.formBuilder.group({
      //id: {value:'', disabled:true},
      id: [''],
      name: [''],
      email: [''],
      contact: [''],
      gender: [''],
      skills: ['']
    });

    this.form.controls['id'].disable();


  this.employeeId = this.route.snapshot.paramMap.get('id');
  if (this.employeeId) {
    this.iseditable = true

    this.employeeservice.getEmployeeById(Number(this.employeeId)).subscribe({
      next: (employee:Employee[]) => {
       this.employees=employee
       this.editEmployeData= this.employees?.filter(
          (x) => x.id === Number(this.employeeId)
        )[0]
        this.form.patchValue(this.editEmployeData);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  }




  addEmployee(): void {
    const employee: Employee = this.form.value;
    if (employee.id) {
      this.updateEmployee(employee);
    } else {
    this.employeeservice.addemployee(employee).subscribe({
      next: (response: any) => {
        console.log(response);
        this.router.navigate(['/Employee']);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
    }
  }

  updateEmployee(employee: Employee): void {
    this.employeeservice.updateEmployee(employee).subscribe(
      updatedEmployee => {
        const index = this.employees.findIndex(e => e.id === updatedEmployee.id);
        if (index !== -1) {
          this.employees[index] = updatedEmployee;
        }
        this.router.navigate(['/Employee']);
      },
      error => {
        console.log('Error occurred while updating employee:', error);
      }
    );
  }

}
