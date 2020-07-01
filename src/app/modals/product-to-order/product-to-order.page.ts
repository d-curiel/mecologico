import { Component, OnInit, Input } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { OrdersPage } from "src/app/orders/orders.page";
import { Order } from "src/app/models/order";
import { PersonalDataService } from "src/app/services/personal-data.service";
import { Product } from "src/app/models/product";
import { OrdersService } from "src/app/services/orders/orders.service";

@Component({
  selector: "app-product-to-order",
  templateUrl: "./product-to-order.page.html",
  styleUrls: ["./product-to-order.page.scss"],
})
export class ProductToOrderPage implements OnInit {
  @Input() order;
  totalPrize = 0;
  catalogData;
  clientData;
  constructor(
    private modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.checkTotal();
  }
  ionViewWillEnter() {
    this.storage.get("catalog").then((catalog) => {
      this.catalogData = catalog;
    });
    this.storage.get("client").then((client) => {
      this.clientData = client;
    });
  }
  dismissModal() {
    this.modalCtrl.dismiss({
      dismissed: true,
      order: this.order,
    });
  }
  deleteProduct(product) {
    const index: number = this.order.indexOf(product);
    if (index !== -1) {
      this.order.splice(index, 1);
    }
    this.checkTotal();
  }
  checkTotal() {
    this.totalPrize = 0;
    this.order.forEach((product) => {
      this.totalPrize += product.amount * product.PVP;
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "¿Desea cancelar el Pedido Actual?",
      message: "Si confirma perderá todo el progreso actual del Pedido.",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Aceptar",
          handler: () => {
            this.router.navigateByUrl("/catalogs");
            this.dismissModal();
          },
        },
      ],
    });

    await alert.present();
  }

  realizarPedido() {
    
    let orderSend = new Order(
      this.clientData.Id,
      this.catalogData.Id,
      this.clientData.TransporteDefecto_Id,
      "Jueves",
      4,
      new Date().toLocaleString().split("/").join("-")
    );

    this.order.forEach((product) => {
      let productOrder = new Product(
        product.Id,
        product.Denominacion,
        product.amount,
        product.UnidadVenta_Id,
        product.UnidadVenta,
        product.PVP
      );
      orderSend.productosPedido.push(productOrder);
      orderSend.TotalPedido =
        orderSend.TotalPedido + product.amount * product.PVP;
    });

    this.ordersService.realizarPedido(orderSend).subscribe(
      (response) => {
        console.log("REALIZADO", response);
      },
      (error) => {
        console.log("ERROR", error);
      }
    );
  }
}
