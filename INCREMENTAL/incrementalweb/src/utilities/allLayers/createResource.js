 const createResource = (thenable) => {
  const cache = {};
  const Pending = 0;
  const Resolved = 1;
  const Rejected = 2;

  const resource = {
    read(input) {
      let result = cache[input];
      if ( !result ) {
        result = {
          status: Pending,
          value : null
        };
        cache[input] = result;
        result.value = thenable(input).then( (res) => {
          cache[input].value = res;
          cache[input].status = Resolved;
        }).catch( (error) => {
          cache[input].value = error;
          cache[input].status = Rejected;
        });
      }
      switch ( result.status ) {
        case Pending:
        case Rejected:  {
          const suspender = result.value;
          throw suspender;
        }
        case Resolved: {
          const value = result.value;
          return value;
        }
        default:
            break;
      }
    }
  }

  return resource;
}
export default createResource;