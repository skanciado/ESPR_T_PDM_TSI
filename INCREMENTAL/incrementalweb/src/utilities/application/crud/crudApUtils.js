
import { createGeneralEdge, deleteAllGeneralEdge } from "../../infrastructure/services/bsdAll";
import { createEdgeRelation, updateEdgeRelation } from "../../application/utilsApplication"
const _ = require('lodash');

export async function cleanValuesAndRelations( dbId, values, attributes){
  let relationKeys = {};
  let savedValues = _.clone(values);
  let documentGroupRelations  = [];
  for (const tab of attributes) {
    for( const item of tab.content){
        const keyFrom = Object.keys(item)[0];
        if (item[keyFrom].isRelation === true && item[keyFrom].relationKind === 'Edge') {
            relationKeys[keyFrom] = { value: savedValues[keyFrom], searchWhere: item[keyFrom].relationDefinition,att: item[keyFrom] };
            delete savedValues[keyFrom];
        }else if (item[keyFrom].isRelation === true && item[keyFrom].relationKind === 'DocumentGroup') {
            //Para relaciones DocumentGroup, calculamos los valors de from i to según la definicion de relationSearch
            let _from = undefined;
            let _to = undefined;
            if( item[keyFrom].relationSearch === "_from"){
                _from = dbId;
            }else{
                _to = dbId;
            }
            //Buscamos todas las edges existentes y las eliminamos
            //TODO: optimización calcular cuales hace falta eliminat y cuales no
            if ( _from !== undefined || _to !== undefined ){
                await deleteAllGeneralEdge(item[keyFrom].relationName, _from, _to);
            }
            //Al mapearlo como list, se generarn muchos labels, checkbox asociados a los valores.
            //Esos valores no los queremos guardar.
            let listValues = Object.keys(savedValues).filter( value =>  value.startsWith(keyFrom));
            for( const listItems of listValues){
                if(listItems.endsWith("__id")){
                    if( item[keyFrom].relationSearch === "_from"){
                        _to = savedValues[listItems];
                    }else{
                        _from = savedValues[listItems];
                    }
                    documentGroupRelations.push({ relationName: item[keyFrom].relationName, relationSearch: item[keyFrom].relationSearch, from: _from, to: _to});
                }
                //Eliminamos los attributos del list
                delete savedValues[listItems];
            }
        }
    }
  }
  return {values: savedValues, relationKeys: relationKeys,documentGroupRelations: documentGroupRelations };
}

async function createDocumentRelations(dbId, documentGroupRelations){
  let _from   = undefined;
  let _to     = undefined;
  for( const rel of documentGroupRelations){
      if( rel.relationSearch === "_from"){
          _from   = dbId;
          _to     = rel.to;
      }else{
          _to     = dbId;
          _from   = rel.from;
      }
      await createGeneralEdge( rel.relationName, _from, _to,{});
  }
}

export async function createRelations(dbId, relationKeys, documentGroupRelations, objectType){
  let resStatus = 0;
  let keysOfRelationKeys = Object.keys( relationKeys);
  for( const key of keysOfRelationKeys) {
    let atts ={}
    atts[relationKeys[key].att.relationValue] = relationKeys[key].value;
    resStatus = await createEdgeRelation( relationKeys[key].att.relationName, atts, dbId, objectType, relationKeys[key].searchWhere);
  };
  await createDocumentRelations( dbId, documentGroupRelations);
  return resStatus;
}

export async function updateRelations(dbId, relationKeys, documentGroupRelations, objectType){
  let resStatus = 0;
  let keysOfRelationKeys = Object.keys( relationKeys);
  for( const key of keysOfRelationKeys) {
    let atts ={}
    atts[relationKeys[key].att.relationValue] = relationKeys[key].value;
    resStatus = await updateEdgeRelation( relationKeys[key].att.relationName, atts, dbId);
  };
  await createDocumentRelations( dbId, documentGroupRelations);
  return resStatus;
}


