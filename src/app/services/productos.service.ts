import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  cargando = true;
  obteniendoProducto = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  producto: Producto = {};

  constructor( private http: HttpClient) { 

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {
      
      this.http.get('https://angular-html-1fdfa-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) => {
        this.productos = resp;
        setTimeout(() => {
          this.cargando = false;
        }, 1000);
      });

    });

  }

  getProducto(id: string) {
    
    return this.http.get(`https://angular-html-1fdfa-default-rtdb.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto (termino: string) {

    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( ()=> {
        // ejecutar después de tener los productos
        // aplicar filtro
        this.filtrarProductos( termino );
      } );

    } else {
      // aplicar filtro
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string ) {
    
    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach( prod => {

      const categoria: any = prod.categoria?.toLowerCase();
      const titulo: any = prod.titulo?.toLowerCase();

      if ( categoria.indexOf( termino ) >= 0 || titulo.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( prod );
      }

    });

  }

}
