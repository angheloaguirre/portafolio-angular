import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // tslint:disable-next-line: no-trailing-whitespace
  
  cargando = true;
  obteniendoProducto = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  // tslint:disable-next-line: no-trailing-whitespace
  constructor( private http: HttpClient) { 

    this.cargarProductos();

  }

  private cargarProductos() {

    this.http.get('https://angular-html-1fdfa-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe( (resp: any) => {
      this.productos = resp;
      setTimeout(() => {
        this.cargando = false;
      }, 2000);
    });

  }

  getProducto(id: string) {
    
    return this.http.get(`https://angular-html-1fdfa-default-rtdb.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto (termino: string) {
    
    this.productosFiltrado = this.productos.filter( producto => {
      return true;
    });

    // console.log(this.productosFiltrado);

  }
}
