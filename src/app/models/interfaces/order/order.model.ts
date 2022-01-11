export interface IOrder {
  id : number,
  name: string,
  orderNumber: string,
  userId: string,
  goodsId: number,
  date: string,
  price: number,
  totalPrice: number,
  quantity: number,
  close: boolean,
  statusId: number
}

export interface IOrderStatus {
  name: string,
}
