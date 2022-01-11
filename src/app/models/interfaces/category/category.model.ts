export interface ICategory {
  id: number,
  name: string,
  languageId: number,
  categoryId: number
}

export interface ICategoryCreate {
  name: string,
  languageId: number,
  categoryId: number
}
