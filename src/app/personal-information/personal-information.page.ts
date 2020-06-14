import { Component, OnInit } from '@angular/core';
import { PersonalDataService } from '../services/personal-data.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {
personalData;
  constructor(private personaDataService : PersonalDataService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.initPErsonalData();
  } initPErsonalData() {
    this.personaDataService.findClienteById(577).subscribe(
      (response) => {
        this.personalData = response;
      },
      (error) => {},
      () => {
       
    console.log("PERSONAL DATA", this.personalData);
      }
    );
  }
}
