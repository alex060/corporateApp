import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonButtons, IonBackButton
} from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.interface';

// Recompilation trigger for updated template with Vendedor column
@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonButtons, IonBackButton
  ]
})
export class ProductosPage implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    this.products = await this.productService.getProducts();
    this.cdr.detectChanges();
  }
}
