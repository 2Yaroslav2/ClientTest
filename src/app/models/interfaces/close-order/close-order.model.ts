export interface ICloseOrder {
  id : number,
  orderNumber: string,
  name: string,
  userId: string,
  goodsId: number,
  date: string,
  price: number,
  totalPrice: number,
  quantity: number,
  endDate: string,
  close: boolean
}
