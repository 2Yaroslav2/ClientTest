export interface IGoods {
  id: number,
  name: string,
  price: number,
  numberOfDays: number,
  quantityInStock: number,
  categoryId: number,
  discount: number,
  countPurchased: number,
  image: string
}

export interface IGoodsCreate {
  name: string,
  price: number,
  numberOfDays: number,
  quantityInStock: number,
  categoryId: number,
  discount: number,
  countPurchased: number,
  image: string
}
