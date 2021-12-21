import { Component, OnInit } from '@angular/core';
import { EquipmentService } from './services/equipment.service';
import { Equipment } from './models/equipment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'equipment-reader-front-end';
  equipment = {} as Equipment;
  equipments: Equipment[] = [];

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit() {
    setInterval(() => {         
      this.getEquipments();
      console.log("update data");
    }, 10000);
  }

  getEquipments() {
    this.equipmentService.getEquipmentByClient().subscribe((equipments: Equipment[]) => {
      this.equipments = equipments;
    });
  }
}
