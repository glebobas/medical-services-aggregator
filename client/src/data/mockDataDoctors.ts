export interface IDoctor {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  phone: string
}

export const mockDataDoctors: IDoctor[] = [
  {
    id: 1,
    first_name: 'Иванов',
    last_name: 'Иван',
    email: 'i@i.ru',
    phone: '+79121234455'
  },
  {
    id: 2,
    first_name: 'Петров',
    last_name: 'Петр',
    email: 'p@p.ru',
    phone: '+79131234455'
  },
  {
    id: 3,
    first_name: 'Сидоров',
    last_name: 'Сидр',
    email: 's@s.ru',
    phone: '+79141234455'
  }
]
