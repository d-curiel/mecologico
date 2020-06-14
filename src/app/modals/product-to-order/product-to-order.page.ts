import { Component, OnInit, Input } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-to-order",
  templateUrl: "./product-to-order.page.html",
  styleUrls: ["./product-to-order.page.scss"],
})
export class ProductToOrderPage implements OnInit {
  @Input() order;
  totalPrize = 0;
  constructor(
    private modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkTotal();
  }
  ionViewWillEnter() {}
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
}
