function ucFirst(str) {
  if (str===null){
    return(str.charAt(0).toUpperCase() + str.slice(1));
  }
  if (str.length=1){
    return(str.charAt(0).toUpperCase() );
  }
  else{
    return(str.charAt(0).toUpperCase() + str.slice(1));
  }
}
