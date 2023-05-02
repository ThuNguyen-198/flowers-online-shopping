import { Component, OnInit } from '@angular/core';
import { EmployeeData, EarningsInfo } from '../data-models/employee.model';
import { FlowersService } from '../services/flowers.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css'],
})
export class ReportPageComponent implements OnInit {
  //placeholder earnings info
  earnings: EarningsInfo = {
    earnings: 0,
    fees: 1400,
    total: 0,
  };

  report: any = [];

  constructor(public flowerService: FlowersService) {}

  ngOnInit(): void {
    this.flowerService.getReport().subscribe((report: any) => {
      report.map((earning: any) => {
        this.earnings.earnings += earning.total;
      });

      this.earnings.total = this.earnings.earnings - this.earnings.fees;
    });
  }
}
