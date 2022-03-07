export default interface IFeature {
    id: number;
    feature_data: {
        product_id: string,
        is_thumb: boolean
    }[];
}