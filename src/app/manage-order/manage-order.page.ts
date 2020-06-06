import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CatalogsService } from "../services/catalogs/catalogs.service";
import { ChangeDetectionStrategy } from "@angular/compiler/src/core";
import { ModalController } from "@ionic/angular";
import { ProductToOrderPage } from '../modals/product-to-order/product-to-order.page';
@Component({
  selector: "app-manage-order",
  templateUrl: "./manage-order.page.html",
  styleUrls: ["./manage-order.page.scss"],
})
export class ManageOrderPage implements OnInit {
  changeDetection: ChangeDetectionStrategy.OnPush;
  categoriasData;
  selectedCategorie = null;
  selectedSubcategorie = null;

  constructor(
    private router: Router,
    private catalogoService: CatalogsService,
    private modalController: ModalController
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
      (error) => {}
    );
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

  async presentModal(product) {

    const modal = await this.modalController.create({
      component: ProductToOrderPage,
      cssClass: 'my-custom-class',
      componentProps: {
        productName: product.Descripcion
      }
    });
    return await modal.present();
  }
}
