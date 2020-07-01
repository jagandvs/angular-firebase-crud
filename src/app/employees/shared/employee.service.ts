import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeList: AngularFireList<any>;
  selectedEmployee: Employee = new Employee();
  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }

  insert(employee: Employee) {
    this.employeeList.push({
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }
  update(employee: Employee) {
    this.employeeList.update(employee.$key, {
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }
  delete($key: string) {
    this.employeeList.remove($key);
  }
}
