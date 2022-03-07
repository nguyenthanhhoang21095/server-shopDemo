export default interface ICategory {
    id: number;
    image: string;
    name: string;
    type: string;
    description: string;
    hasSubCategory :boolean;
    subCategory: number[] | null;
}