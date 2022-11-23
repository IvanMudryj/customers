const LocalStorageService = (function(){
    var _keyPairs:{[key: string]: string} = {};
    
    function _setItem(key:string, value:string) {
      _keyPairs[key] = value;
    }
    function _getItem(key:string) {
      return _keyPairs[key];
    }
    function _clearItem(key:string) {
        delete _keyPairs[key];
    }
   return {
        setItem : _setItem,
        getItem : _getItem,
        clearItem : _clearItem
    }
   })();
   export default LocalStorageService;