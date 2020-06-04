import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { CategoriesService } from "../services/orders/categories/categories.service";
import { CatalogsService } from "../services/catalogs/catalogs.service";
import { ChangeDetectionStrategy } from "@angular/compiler/src/core";
import { trigger, transition, style, animate } from '@angular/animations';
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
    private catalogoService: CatalogsService
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

}
