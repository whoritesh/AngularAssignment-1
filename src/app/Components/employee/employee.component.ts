import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/employee.model';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponentComponent } from '../confirmation-modal-component/confirmation-modal-component.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

employees : Employee[] = [];

constructor(
  private employeesService : EmployeeService,
  private router: Router,
  private matdialog: MatDialog,
  private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.employeesService.getallemployees()
    .subscribe({
      next: (employees) =>
      {
        this.employees = employees
      },
      error: (employees) =>
      {
        console.log(Response);
      }
    });
  }


  editEmployee(employee: Employee): void {
    console.log(employee);
    this.router.navigate(['/Employee/edit', employee.id]);
  }

  addEmployee(employee: Employee): void {
    this.employeesService.addemployee(employee).subscribe({
      next: (response: any) => {
        this.toastr.success('Employee Added successfully!', 'Success');
        this.router.navigate(['/Employee']);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  deleteEmployee(employee: Employee): void {
    this.employeesService.deleteEmployee(employee.id)
      .subscribe(
        () => {
          const index = this.employees.findIndex(emp => emp.id === employee.id);
          if (index !== -1) {
            this.employees.splice(index, 1);
            this.toastr.success('Employee deleted successfully!', 'Success');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  gotoadd(){
    this.router.navigate(['/Employee/add']);
  }

  confimDelete(employee: Employee) {
    if(confirm("Are you sure you want to delete "+ employee.name +"?")) {
      this.deleteEmployee(employee);
    }
  }

  // openpopup(){
  //   this.matdialog.open(ConfirmationModalComponentComponent, {width: '500px', height: '300px'})
  // }

}
