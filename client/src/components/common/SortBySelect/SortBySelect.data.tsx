import { SortByState, TypeSelectOption } from "./SortBySelect.types"


export const productsSortByNames = ['title' , 'price' , 'createdAt']  as SortByState['name'][]

const generateOptionsForFields = (fields: SortByState['name'][]): TypeSelectOption[] => {
  return fields.flatMap(field => [
    {
      label: <>{`${field.charAt(0).toUpperCase() + field.slice(1)} ASC`}</>,
      sortBy: field,
      sortOrder: 'asc',
      value: `${field.charAt(0).toUpperCase() + field.slice(1)} ASC`,
    },
    {
      label: <>{`${field.charAt(0).toUpperCase() + field.slice(1)} DESC`}</>,
      sortBy: field,
      sortOrder: 'desc',
      value: `${field.charAt(0).toUpperCase() + field.slice(1)} DESC`,
    },
  ]);
};


export const options:TypeSelectOption[] = generateOptionsForFields(productsSortByNames)
