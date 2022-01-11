export interface IGoodsDescription {
  id: number,
  goodsId: number,
  languageId: number,
  description: string
}

export interface IGoodsDescriptionCreate {
  goodsId: number,
  languageId: number,
  description: string
}

export interface IGetWhereGoodsDescription {
  goodsId: number,
  languageId: number,
}
