import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.page.html',
  styleUrls: ['./manage-order.page.scss'],
})
export class ManageOrderPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }


  goBackAndCancel(){
  }
}
