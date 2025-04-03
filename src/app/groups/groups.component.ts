import {Component, inject, OnInit} from '@angular/core';
import {GroupsService} from '../services/groups.service';
import {GroupCardDetails} from '../types/GroupCardDetails';
import {LowerCasePipe, TitleCasePipe} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'app-groups',
  imports: [
    TitleCasePipe,
    LowerCasePipe,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit{

  private groupsService = inject(GroupsService)

  protected groupCards :GroupCardDetails[] | null = null

  protected unauthorized = false;

  ngOnInit() {
    this.groupsService.fetchGroupDetails().then(returnObj => {
      returnObj.subscribe(result => {

        this.groupCards = result.body
      })
    })
  }


}
