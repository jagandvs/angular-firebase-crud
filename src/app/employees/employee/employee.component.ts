import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.employeeService.getData();
    this.resetForm();
  }
  onSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == null) {
      this.employeeService.insert(employeeForm.value);
      this.toastr.success('submitted Successfully', 'Employee Register');
    } else {
      this.employeeService.update(employeeForm.value);
      this.toastr.warning('submitted Successfully', 'Employee Register');
    }

    this.resetForm(employeeForm);

  }
  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null)
      employeeForm.reset();
    this.employeeService.selectedEmployee = {
      $key: null,
      name: '',
      position: '',
      office: '',
      salary: 0
    };
  }

}
