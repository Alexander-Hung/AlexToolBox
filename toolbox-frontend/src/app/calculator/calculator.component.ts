import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  result: any = '';
  expression: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  calculate(): void {
    try {
      this.result = math.evaluate(this.expression);
    } catch (error) {
      this.result = "Error: Invalid Expression";
    }
  }
}
