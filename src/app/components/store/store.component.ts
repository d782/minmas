import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
    products=[
      {
        id:1,
        name:"Baldosa de piedra caliza Azul",
        quantity:25,
        price:2340,
        precioDeCompra:245,
        fechaDeCreacion:new Date().toLocaleString(),
        proveedor:"Triturados el puerto",
      },
      {
        id:1,
        name:"Baldosa para patios",
        quantity:25,
        price:2340,
        precioDeCompra:245,
        fechaDeCreacion:new Date().toLocaleString(),
        proveedor:"Triturados el puerto",
      },
      {
        id:1,
        name:"Adoquines de piedra caliza turquesa",
        quantity:25,
        price:2340,
        precioDeCompra:245,
        fechaDeCreacion:new Date().toLocaleString(),
        proveedor:"Triturados el puerto",
      },
    ];
}
