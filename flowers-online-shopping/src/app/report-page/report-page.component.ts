import { Component, OnInit } from '@angular/core';
import { EmployeeData, EarningsInfo } from '../data-models/employee.model';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent implements OnInit {

  //placeholder earnings info
  report: EarningsInfo = {
    earnings: 11400,
    fees: 1400,
    total: 10000
  }
  


  constructor() { }

  ngOnInit(): void {
    //need to get the value of the time period dropdown from html and then calculate earnings information appropriately. e.g if earnings is set to month then divide everything by 12, etc. 


  }

}
