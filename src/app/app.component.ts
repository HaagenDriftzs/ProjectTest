import {Component, OnInit} from '@angular/core';
import {AuthenticationSectionService} from './authenticationSection/authenticationSection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TestMain';

  constructor(private auhtService: AuthenticationSectionService) {
  }

  ngOnInit() {
    this.auhtService.automaticallyLogin();
  }
}
