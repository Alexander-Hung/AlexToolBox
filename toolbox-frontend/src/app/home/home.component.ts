import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (!sessionStorage.getItem('isPageRefreshed')) {
      sessionStorage.setItem('isPageRefreshed', 'true');
      // This will reload page once prevent reloading of page again for that session.
      window.location.reload();

    }
  }
}
