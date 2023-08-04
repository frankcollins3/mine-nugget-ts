import { strainsINTERFACE } from "./InterfaceTypes";

export function findStrainFromAllStrains(strainToFind:any, allStrains:strainsINTERFACE[]|any) { return allStrains.find(s => s.strain === strainToFind) }
// export function findStrainFromArray(strainToFind:strainsINTERFACE, allStrains:strainsINTERFACE[]) { // const clickedStrain:strainsINTERFACE = allStrains.find(s => s.strain === strainToFind)

    
