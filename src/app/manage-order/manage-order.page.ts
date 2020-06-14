import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CatalogsService } from "../services/catalogs/catalogs.service";
import { ModalController, PopoverController } from "@ionic/angular";
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

  constructor(
    private router: Router,
    private catalogoService: CatalogsService,
    public popoverController: PopoverController,
    public modalController: ModalController
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    /*
    AQUÍ RESCATARÍAMOS EL ID DEL CATÁLOGO SELECCIONADO
    */
    this.initManageOrder();
  }

  initManageOrder() {
    this.catalogoService.findProductosClasificadosByIdCatalogo(78).subscribe(
      (response) => {
        this.categoriasData = response.map((categoria) => {
          return {
            Id: categoria.Id,
            Nombre: categoria.Nombre,
            Orden: categoria.Orden,
            subcategorias: categoria.subcategorias.filter((subcategoria) =>
              subcategoria.hasOwnProperty("productos")
            ),
          };
        });
      },
      (error) => {},
      () => {
        //CHECKEAR SI YA HABÍA ALGÚN DATO PREVIO (SI ES UNA EDICIÓN DE PEDIDO)
        this.initAmountToProducts();
      }
    );
  }
  initAmountToProducts() {
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
    this.selectedCategorie = categorie;
  }
  selectSubcategorie(subcategorie) {
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


}
