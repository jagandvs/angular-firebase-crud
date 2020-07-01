import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { ROUTER_CONFIGURATION } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];
  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = []
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee)
      })
    })
  }
  onEdit(employee: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, employee);
  }
  onDelete($key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.delete($key);
      this.toastr.warning("Deleted Successfully", "Employee Register");
    }
  }
}
