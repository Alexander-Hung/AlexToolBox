import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Service',
  templateUrl: './Service.component.html',
  styleUrls: ['./Service.component.css']
})
export class ServiceComponent implements OnInit {
  tools: string[] = [];

  constructor(private toolsService: ToolsService) { }

  ngOnInit(): void {
    this.toolsService.getTools().subscribe(
      data => {
        console.log("Data received:", data);
        this.tools = data.tools;
      },
      error => {
        console.error("Error fetching tools:", error);
      }
    );
  }
}
