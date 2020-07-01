export class Product {
  Cliente_Id: Number;
  CatalogoProducto_Id: Number;
  Descripcion: String;
  CantidadPedido: Number;
  UnidadPedido_Id: Number;
  UnidadPedido: String;
  PVPPedido: Number;
  NotaPedido: String;

  /**
   * ID provisional para pruebas 
   * @param catalogProductId 
   * @param description 
   * @param amountOrder 
   * @param unitOrderId 
   * @param unitOrder 
   * @param pvp 
   * @param note 
   */
  constructor(catalogProductId, description, amountOrder, unitOrderId, unitOrder, pvp){
    this.Cliente_Id = 727;
    this.CatalogoProducto_Id = catalogProductId;
    this.Descripcion = description;
    this.CantidadPedido = amountOrder;
    this.UnidadPedido_Id = unitOrderId
    this.UnidadPedido = unitOrder;
    this.PVPPedido = pvp;
    this.NotaPedido = "";
  }

  /**
   *  constructor(clientId, catalogProductId, description, amountOrder, unitOrderId, unitOrder, pvp, note){
    this.Cliente_Id = clientId;
    this.CatalogoProducto_Id = catalogProductId;
    this.Descripcion = description;
    this.CantidadPedido = amountOrder;
    this.UnidadPedido_Id = unitOrderId
    this.UnidadPedido = unitOrder;
    this.PVPPedido = pvp;
    this.NotaPedido = note;
  }
   */
}
