import data  from "./playground/i18n/es.yml" with {type:"yaml"}
import  v from "voca"

for( const [key,value] of Object.entries(data) ){    
    if( key == "classRowDescs" )
        for(const [_key,_value] of Object.entries(value) )
        if(_key.length < 10)
            console.log(v.camelCase(_key))
        
}

