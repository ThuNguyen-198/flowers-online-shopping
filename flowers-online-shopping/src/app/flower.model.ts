/*MODEL

Property: Flower
Purpose: Create a generic type for the applicaion's properties.
*/

export interface Flower {
    id: string,
    name: string,
    color: string,
    kind: string,
    occasion: string
}