import { Component, OnInit } from "@angular/core";
import { CatalogsService } from "../services/catalogs/catalogs.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { PersonalDataService } from "../services/personal-data.service";
import { OrdersService } from "../services/orders/orders.service";

@Component({
  selector: "app-catalogs",
  templateUrl: "./catalogs.page.html",
  styleUrls: ["./catalogs.page.scss"],
})
export class CatalogsPage implements OnInit {
  catalogsData: any = [];
  constructor(
    private catalogsService: CatalogsService,
    private personalDataService: PersonalDataService,
    private ordersService: OrdersService,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.getAllCatalogs();
  }
  ionViewWillLeave() {
    this.catalogsData = [];
  }
  getAllCatalogs() {
    this.catalogsService.findAll().subscribe(
      (response) => {
        console.log("RESPONSE", response);
        this.catalogsData = response.filter((i) => i.Estado !== "Cerrado");
      },
      (error) => {
        //mostratiamos usando un boolean la screen con un oh no!
        console.log("CATALOGS ERROR", error);
      },
      () => {
        this.setOrdersToCatallogs();
      }
    );
    this.loadPersonalData();
  }
  setOrdersToCatallogs() {
    this.catalogsData.forEach((catalog) => {
      this.ordersService.findPedidosByIdCatalogo(catalog.Id).subscribe(
        (response) => {
          catalog.ordersDone = response;
        },
        (error) => {
          console.log("ERROR", error);
        }
      );
      catalog.collapsed = true;
    });

    console.log("catalogos", this.catalogsData);
  }
  goToCreateNewOrder(catalog) {
    this.storage.set("catalog", catalog);
    this.router.navigate(["/manage-order"]);
  }
  mostrarPedidos(catalog) {
    catalog.collapsed = !catalog.collapsed;
  }

  loadPersonalData() {
    this.personalDataService.findClienteById(576).subscribe(
      (response) => {
        response.Id = 576;
        this.storage.set("client", response);
      },
      (error) => {
        console.log("ERROR USER", error);
      }
    );
  }
}
