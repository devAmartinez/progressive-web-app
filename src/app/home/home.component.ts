import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/lists.service';
import { enterAnimation } from '../animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [enterAnimation]
})
export class HomeComponent implements OnInit {


  constructor(
  	private _listService : ListService
  ) {}

  ngOnInit() {}
}
