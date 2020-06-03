import { Component, OnInit } from "@angular/core";
import { CatalogsService } from "../services/catalogs/catalogs.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-catalogs",
  templateUrl: "./catalogs.page.html",
  styleUrls: ["./catalogs.page.scss"],
})
export class CatalogsPage implements OnInit {
  catalogsData: any;
  constructor(private catalogsService: CatalogsService, private router: Router) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.getAllCatalogs();
  }

  getAllCatalogs() {
    this.catalogsService.findAll().subscribe((response) => {
      this.catalogsData = response.filter((i) => i.Estado !== "Cerrado");
    });
  }

  goToCreateNewOrder(){
    //TODO: CREAMOS UN NUEVO PEDIDO EN EL STORAGE PARA MANEJAR EL CARRITO
    this.router.navigate(['/manage-order']);
  }
}
