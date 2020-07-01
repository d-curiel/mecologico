import { Product } from "./product";

export class Order {

  Cliente_Id: Number;
  Catalogo_Id: Number;
  Numero: String;
  Transporte_Id: Number;
  Dia: String;
  TotalPedido: number;
  Ubuntu: Number;
  PedidoClienteEstado_Id: Number;
  FechaPedido: String;
  productosPedido: Array<Product>;
  constructor(clientId, catalogId, transportId, day, stateId, dateOrder){
    this.Cliente_Id = clientId;
    this.Catalogo_Id = catalogId;
    this.Numero = "2";
    this.Transporte_Id = transportId;
    this.Dia = day;
    this.TotalPedido = 0;
    this.Ubuntu = 0;
    this.PedidoClienteEstado_Id = stateId;
    this.FechaPedido = dateOrder;
    this.productosPedido = [];
  }
}
