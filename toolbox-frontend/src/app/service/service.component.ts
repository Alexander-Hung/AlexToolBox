import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (!sessionStorage.getItem('isPageRefreshed')) {
      sessionStorage.setItem('isPageRefreshed', 'true');
      // This will reload page once prevent reloading of page again for that session.
      window.location.reload();

    }
  }
}
