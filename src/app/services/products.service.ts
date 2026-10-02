import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch('assets/data/products.json');
      if (!response.ok) throw new Error('Status: ' + response.status);
      const products: Product[] = await response.json();
      return products;
    } catch (err) {
      return [
        {
          id: 1,
          nombre: "Portátil Dell Inspiron",
          unidades: 12,
          precio: 1200,
          foto: "assets/images/dell.jpg",
          vendedor: "Tech Solutions S.L."
        },
        {
          id: 2,
          nombre: "Monitor LG UltraWide",
          unidades: 8,
          precio: 299,
          foto: "assets/images/lg.jpg",
          vendedor: "Display Ibérica"
        },
        {
          id: 3,
          nombre: "Teclado Mecánico Pro",
          unidades: 25,
          precio: 115,
          foto: "assets/images/dell.jpg",
          vendedor: "Periféricos Madrid"
        }
      ];
    }
  }
}
