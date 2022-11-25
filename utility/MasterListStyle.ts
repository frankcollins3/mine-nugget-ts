import * as AllStrainContainerSASS from '/styles/AllStrainContainer.module.scss'
import * as StrainSASS from '/styles/Strain.module.scss'
import * as HomePageSASS from '/styles/Home.module.scss'

export default async function MasterListStyle(stylekeyword:string) {
    if (stylekeyword) {
        console.log(AllStrainContainerSASS)
        console.log(StrainSASS)
        console.log(HomePageSASS)
        if (stylekeyword === 'strainpage') {
            // return stylekeyword
            return StrainSASS
        } else if (stylekeyword === 'home') {
            return HomePageSASS
        }
        else if (stylekeyword  === 'straincontainer') {
            return AllStrainContainerSASS
        }
    }


}
