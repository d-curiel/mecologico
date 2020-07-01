import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CatalogsService } from "../services/catalogs/catalogs.service";
import {
  ModalController,
  PopoverController,
  ToastController,
  NavController,
  LoadingController,
} from "@ionic/angular";
import { ProductToOrderPage } from "../modals/product-to-order/product-to-order.page";
@Component({
  selector: "app-manage-order",
  templateUrl: "./manage-order.page.html",
  styleUrls: ["./manage-order.page.scss"],
})
export class ManageOrderPage implements OnInit {
  categoriasData;
  selectedCategorie = null;
  selectedSubcategorie = null;
  order = [];

  public loading;
  constructor(
    private router: Router,
    private catalogoService: CatalogsService,
    public popoverController: PopoverController,
    public modalController: ModalController,
    public toastController: ToastController,
    private navCtrl: NavController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.presentLoading();
    /*
    AQUÍ RESCATARÍAMOS EL ID DEL CATÁLOGO SELECCIONADO
    */
    this.initManageOrder();
  }

  initManageOrder() {
    //CHECKEAR SI YA HABÍA ALGÚN DATO PREVIO (SI ES UNA EDICIÓN DE PEDIDO)

    this.catalogoService.findProductosClasificadosByIdCatalogo(78).subscribe(
      (response) => {
        this.categoriasData = response.map((categoria) => {
          return {
            Id: categoria.Id,
            Nombre: categoria.Nombre,
            Orden: categoria.Orden,
            FechaModificacion: categoria.FechaModificacion,
            subcategorias: categoria.subcategorias.filter((subcategoria) =>
              subcategoria.hasOwnProperty("productos")
            ),
          };
        });
      },
      (error) => {
        console.log("ERROR");
        this.presentToast();
        this.navCtrl.back();
        this.loading.dismiss();
      },
      () => {
        this.loading.dismiss();
        this.initAmountToProducts();
      }
    );
  }
  initAmountToProducts() {
    this.categoriasData = this.categoriasData.filter(
      (categoria) => categoria.subcategorias.length > 0
    );
    this.categoriasData.forEach((category) => {
      category.subcategorias.forEach((subcategory) => {
        subcategory.productos.forEach((product) => {
          product.amount = 0;
        });
      });
    });
  }

  checkCoherenceOrder() {
    this.categoriasData.forEach((category) => {
      category.subcategorias.forEach((subcategory) => {
        subcategory.productos.forEach((product) => {
          let foundProudct = this.order.find(
            (orderProduct) => orderProduct.Id === product.Id
          );
          if (!foundProudct) {
            product.amount = 0;
          }
        });
      });
    });
  }
  selectCategorie(categorie) {
    console.log("CATEGORIA: ", categorie);
    this.selectedCategorie = categorie;
  }
  selectSubcategorie(subcategorie) {
    console.log("SUBCATEGORIA: ", subcategorie);
    this.selectedSubcategorie = subcategorie;
  }
  navigateBackOnCatalog() {
    if (this.selectedSubcategorie) {
      this.selectedSubcategorie = null;
    } else if (this.selectedCategorie) {
      this.selectedCategorie = null;
    }
  }
  checkOrder(modifiedProduct) {
    let foundProudct = this.order.find(
      (product) => product.Id === modifiedProduct.Id
    );

    if (!foundProudct && modifiedProduct.amount !== 0) {
      this.order.push(modifiedProduct);
    } else {
      if (modifiedProduct.amount === null || modifiedProduct.amount <= 0) {
        this.deleteProduct(foundProudct);
      } else {
        let index = this.order.indexOf(foundProudct);
        this.order[index] = modifiedProduct;
      }
    }
  }

  addAmount(product) {
    product.amount++;
  }
  removeAmount(product) {
    if (product.amount < 1) {
      product.amount = 0;
    } else {
      product.amount--;
    }
  }

  async presentPopover(ev: any) {
    const modal = await this.modalController.create({
      component: ProductToOrderPage,
      componentProps: { order: this.order },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.order = dataReturned.data.order;
        this.checkCoherenceOrder();
      }
    });
    return await modal.present();
  }

  findIndexToUpdate(modifiedProduct) {
    return modifiedProduct.id === this;
  }

  deleteProduct(product) {
    const index: number = this.order.indexOf(product);
    if (index !== -1) {
      this.order.splice(index, 1);
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Your settings have been saved.",
      duration: 2000,
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
  }
}
