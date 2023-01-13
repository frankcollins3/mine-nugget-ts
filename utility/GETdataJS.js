import Axios from 'axios'
import $ from 'jquery'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'
import Regex from 'utility/MasterRegex'

export default async function GET (url, data) {
    class GETclass {
        constructor(url) {
            this.url = url
            this.data = data
        }

        get getgetter() { 
            console.log('in the getGetter')
            return this.axiosGet() 
        }
        // get getgetter() { return this.axiosGet() }

        async axiosGet() {
            console.log('data')
            console.log(data)
            let strainfetch = Axios.get(url)
            console.log('strainfetch')
            console.log(strainfetch)
        }

        if (url) {
            const getCall = await new GETclass(url).getgetter
            console.log('getCall')
            console.log(getCall)
        }

    }
}