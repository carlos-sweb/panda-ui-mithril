import data  from "./playground/i18n/es.yml" with {type:"yaml"}
import  v from "voca"

for( const [key,value] of Object.entries(data) ){
    console.log(key)
    if( key == "classRowDescs" )
        for(const [_key,_value] of Object.entries(value) )
            console.log(v.camelCase(_key))
        
}

