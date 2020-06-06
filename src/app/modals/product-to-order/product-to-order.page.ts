import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-product-to-order",
  templateUrl: "./product-to-order.page.html",
  styleUrls: ["./product-to-order.page.scss"],
})
export class ProductToOrderPage implements OnInit {
  @Input() productName: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  dismissModal() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
