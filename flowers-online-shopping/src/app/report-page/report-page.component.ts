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
    fees: 400,
    bouquets: 0,
    flowers: 0,
    total: 0,
  };
  time = 'Year';

  report: any = [];

  constructor(public flowerService: FlowersService) {}

  ngOnInit(): void {
    this.flowerService.getReport().subscribe((report: any) => {
      report.map((earning: any) => {
        this.earnings.earnings += earning.total;
        this.earnings.bouquets += earning.products.length;
        this.earnings.flowers += earning.individuals.length;
      });

      this.earnings.total = this.earnings.earnings - this.earnings.fees;
    });
  }
}
