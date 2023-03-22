import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.css'],
})
export class CtaComponent implements OnInit {
  name: string = '';
  email: string = '';
  message: string = '';
  constructor() {}

  ngOnInit(): void {}
  submitForm(form: NgForm) {}
}
