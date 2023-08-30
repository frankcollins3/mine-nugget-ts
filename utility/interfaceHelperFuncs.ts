import {Strain} from "./InterfaceTypes"
import { findStrainFromAllStrains } from "./utilityValues"

// the extended Strain type can now specify the keys that are allowed to be returned and perform Object.keys() on that interface which cannot be done on a regular interface. 
export function objectKeysFunc (strain:Strain<any>) { return Object.keys(strain) }
export function objectValuesFunc (strain:Strain<any>) { return Object.values(strain) }

export function nonGenericObjectKeysFunc(strain:any) { return Object.keys(strain)}
export function nonGenericObjectValsFunc(strain:any) { return Object.values(strain)}

// const strainFind = (strainToFind:string, allStrains:any[], endpoint:string) => {
// strain| strainid | dominant| funfact |parents  |taste  | smell | gold |  nugget  | thc  | cbd  
// }


