import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }
  public goToLoginPage() {
    this.route.navigate(['/login']);
  }

}
